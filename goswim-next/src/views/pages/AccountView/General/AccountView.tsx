import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CreateIcon from '@mui/icons-material/Create';
import DeleteIconOutline from '@mui/icons-material/DeleteOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import clsx from 'clsx';
import { Formik } from 'formik';
import moment from 'moment';
import AvatarEditor, { ImageState } from 'react-avatar-editor';
import { Save as SaveIcon } from 'react-feather';
import Avatar from 'src/components/Avatar';
import LoadingButton from 'src/components/LoadingButton';
import { MultiSelectWithSearch } from 'src/components/MultiSelectWithSearch';
import TooltipComponent from 'src/components/Tooltip';
import config from 'src/config';
import {
  AccountType,
  Certificates,
  certificateType,
  DateFormat,
  getMaxPriceProduct,
  StoreType,
  SUBSCRIPTION_ROUTES
} from 'src/constants';
import {
  getProfile,
  logout,
  saveSettings,
  updateProfile,
  updateProfileStatus,
  UpdateUserProfile,
  uploadProfileImgToS3Bucket,
  UserProfile
} from 'src/store/account';
import { changePassword } from 'src/store/goswim/account';
import { getTeamHeirarchy } from 'src/store/management/team';
import { getSubscriptions, IGetSubscriptionProducts } from 'src/store/subscriptions';
import { MultiSelectOption } from 'src/types';
import { ComponentProps, FormikCommonProps } from 'src/types/components';
import * as Yup from 'yup';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { deleteAccount } from 'src/store/management/members';
import ConfirmGroupExit from './ConfirmGroupExit';
import { useRouter } from 'next/router';

export interface GeneralSettingsProps {
  user: UserProfile | null;
  error: any;
  message: string;
  isSubmitting: boolean;
  lastUpdatedPictureTimestamp: number;
}

interface FormikInitialValues extends FormikCommonProps {
  city: string;
  country: string;
  zipcode: string;
  state: string;
  email: string;
  fullName: string;
  phone: string;
  designation: string;
  experience: string;
  address1: string;
  address2: string;
  tz: string[];
  use_hd_video: boolean;
  dateFormat: DateFormat;
  autoplay_video: boolean;
  email_notification_enabled: boolean;
  promotion_enabled: boolean;
  certificates?: MultiSelectOption[];
}

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const profileValidation = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  fullName: Yup.string()
    .max(255)
    .required('Full Name is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  city: Yup.string().max(255),
  country: Yup.string().max(255),
  state: Yup.string().max(255),
  zipcode: Yup.number(),
  address1: Yup.string().max(255),
  address2: Yup.string().max(255),
  designation: Yup.string().max(255),
  experience: Yup.string().max(2000),
  certificates: Yup.string().max(255),
  tz: Yup.string().required('TimeZone is Required')
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions<MultiSelectOption>();

const useStyles = makeStyles(theme => ({
  root: { cursor: 'default' },
  input: {
    display: 'none'
  },
  actionIcon: {
    marginLeft: 10
  },
  avatar: {
    height: 80,
    width: 80,
    cursor: 'pointer',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    borderColor: theme.palette.primary.main,
    borderWidth: '3px',
    borderStyle: 'solid',
    [theme.breakpoints.down('sm')]: { height: 50, width: 50, borderWidth: '1.5px' }
  },
  avatarHldr: {
    [theme.breakpoints.only('md')]: { transform: 'scale(0.8)' }
  },
  deleteIcon: {
    fontSize: 28,
    color: '#f44336',
    backgroundColor: colors.common.white,
    position: 'relative',
    right: -60,
    top: 40,
    zIndex: 9,
    borderRadius: 25,
    cursor: 'pointer',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)',
    padding: 3,
    height: 30,
    width: 30,
    [theme.breakpoints.down('md')]: {
      top: 24,
      right: -32,
      width: 24,
      height: 24,
      padding: 1.5
    },
    [theme.breakpoints.only('sm')]: {
      top: 24,
      right: -54,
      width: 30,
      height: 30,
      padding: 4
    }
  },
  avatarEditor: {
    borderRadius: 150,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 11px 20px -8px rgba(0,0,0,0.50)'
  },
  mt: {
    marginTop: 16
  },
  cardHeaderCustom: {
    '& .MuiCardHeader-content': {
      display: 'inherit'
    },
    '& .MuiCardHeader-subheader': {
      fontSize: '11px',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
      marginTop: '-2x ',
      marginLeft: '10px',
      padding: '4px 7px !important',
      borderRadius: '4px'
    }
  },
  sideBox: {
    borderBottomColor: theme.palette.mode === 'light' ? '#ccc' : '#464646'
  },
  rosterIconWidth: {
    width: 38,
    height: 38
  },
  sideIcon: {
    marginBottom: 7,
    color: theme.palette.secondary.main,
    fontSize: '2rem'
  },
  roleIcon: {
    marginBottom: 4,
    color: theme.palette.secondary.main,
    fontSize: '2rem'
  },
  rosterIcon: {
    color: theme.palette.secondary.main,
    fontSize: '2rem',
    position: 'relative',
    right: 5
  },
  rosterContent: {
    fontWeight: 800
  },
  pb0: {
    paddingBottom: '0 !important'
  },
  mb0: {
    marginBottom: 0
  },
  certificates: {
    '& .MuiAutocomplete-inputRoot': {
      flexWrap: 'nowrap'
    }
  },
  buttonText: { fontWeight: 500, fontSize: '0.875rem', color: theme.palette.common.white },
  pt: {
    paddingTop: '0.5rem'
  },
  avatarWrapper: {
    width: '100%',
    float: 'left',
    display: 'flex',
    alignItems: 'center'
  },
  userDetails: {
    marginLeft: theme.spacing(3),
    '& h1': {
      fontWeight: 500,
      fontSize: 22,
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      }
    },
    '& h4': {
      fontWeight: 400,
      fontSize: 18,
      marginBottom: theme.spacing(0),
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      }
    },
    [theme.breakpoints.down('sm')]: { marginLeft: theme.spacing(1) }
  },
  titleSection: {
    fontSize: theme.spacing(2.5),
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: { marginBottom: theme.spacing(1) }
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  titleWithBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  checkBoxFullWidth: {
    [theme.breakpoints.up('xs')]: {
      display: 'block !important',
      width: 'fit-content'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: 'fit-content'
    }
  },
  changePwd: {
    marginBottom: theme.spacing(1)
  },
  upgradeAccount: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),

    color: theme.palette.common.white
  },
  subTitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: { fontSize: theme.spacing(2) }
  },

  personalDetail: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: { fontSize: theme.spacing(2) }
  },
  subTitleWithoutSpacing: {
    fontSize: theme.spacing(2.5),
    fontWeight: 500,
    color: theme.palette.text.primary,
    width: '100%',
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: { fontSize: theme.spacing(2) }
  },
  GroupItems: {
    fontSize: '14px',
    padding: '8px 4px !important',
    margin: theme.spacing(1),
    textTransform: 'capitalize'
  },
  userType: {
    width: '100%',
    textAlign: 'right',
    '& h3': {
      fontSize: theme.spacing(2.5),
      fontWeight: 500,
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('sm')]: { fontSize: theme.spacing(2) }
    }
  },
  EditIcon: {
    fontSize: 24,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      fontSize: 20
    }
  },
  name: {
    '& .MuiInput-underline:before': {
      content: 'none'
    },
    '& input': {
      fontSize: theme.spacing(2.5),
      color: theme.palette.text.primary,
      fontWeight: 500,
      borderBottom: 'none',
      [theme.breakpoints.down('sm')]: { fontSize: theme.spacing(2) }
    },
    '& fieldset': {
      border: 'none'
    }
  },
  userNameField: {
    display: 'flex',
    alignItems: 'center'
  },
  dialogTitle: {
    '& h2': {
      color: theme.palette.text.primary,
      fontSize: '1.25rem',
      fontWeight: 600
    }
  },
  changePwdModal: {
    width: '100%',
    float: 'left',
    '& .MuiDialogContent-root': {
      overflow: 'hidden',
      padding: '8px 16px 24px 16px !important'
    }
  },
  xs: {
    display: ' none',
    [theme.breakpoints.down('sm')]: { display: 'inline-flex' }
  },
  sm: {
    display: 'none',
    [theme.breakpoints.up('sm')]: { display: 'inline-flex' }
  },
  playbackCheck: {
    ' & .MuiCheckbox-root': {
      padding: '4px !important'
    }
  },
  expand: {
    padding: 0
  },
  role: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.primary.main
  },
  errMsg: {
    color: 'red',
    marginTop: theme.spacing(1)
  },
  cardDiv: {
    paddingTop: '0px !important'
  },
  deleteBtn: {
    marginRight: `${theme.spacing(2)} !important`
  },
  infoIcon: {
    fontSize: 100,
    color: theme.palette.text.secondary,
    marginBottom: `${theme.spacing(2)} !important`
  },
  deleteSec: {
    marginBottom:`${theme.spacing(2)} !important`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  editProfileBtn: {
    marginTop: `${theme.spacing(2)} !important`,
    marginBottom: `${theme.spacing(2)} !important`
  },
  profileInModal: {
    width: 120,
    height: 120,
    borderRadius: `${theme.spacing(2)} !important`,
    border: `4px solid ${theme.palette.primary.main}`,
    marginBottom: `${theme.spacing(2)} !important`
  },
  progressBox: {
    [theme.breakpoints.down('sm')]: { marginTop: 8 }
  }
}));

interface Props {
  children: React.ReactElement;
  open: boolean;
}

const ValueLabelComponent = (props: Props) => {
  const { children } = props;
  return <TooltipComponent title="Resize image">{children}</TooltipComponent>;
};

/** Add option in any extra certificate is added and stored previously */
const setAutoCompleteCertificateValue = (
  certificatesStored: string[],
  certificates: MultiSelectOption[]
) => {
  let newOptions: string[] = [];
  newOptions = certificatesStored?.filter(
    certificate => certificate !== Certificates.USA_SWIMMING && certificate !== Certificates.ASCA
  );
  if (newOptions?.length > 0) {
    const certificateOption: MultiSelectOption[] = newOptions?.map(certificate => {
      return { title: certificate, value: certificate };
    });
    return [...certificates, ...certificateOption];
  }
  return certificates;
};

/** To convert the certificates value received  set it as a intital value to the user  */
const setCertificatesValue = (
  selectedCertificates: string[] | undefined,
  certificateOptions: MultiSelectOption[]
) => {
  if (selectedCertificates && selectedCertificates.length > 0) {
    return certificateOptions?.filter(certificate =>
      selectedCertificates.includes(certificate.title)
    );
  }
  return [];
};

const GeneralSettings: React.FC<GeneralSettingsProps & ComponentProps> = ({
  user,
  error,
  className,
  message,
  isSubmitting,
  lastUpdatedPictureTimestamp,
  ...rest
}) => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState<File | string | null>(null);
  const [profileOnModal, setProfileOnModal] = useState<File | string | null>(null);
  const [zoomValue, setzoomValue] = useState<number>(1);
  const [minZoomValue, setMinZoomValue] = useState<number>(1);
  const [isAvatarEditor, setIsAvatarEditor] = useState<boolean>(false);
  const [isSlider, setIsSlider] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [addFields, setAddFields] = useState(false);
  const avatarRef: React.RefObject<AvatarEditor> = useRef(null);
  const textInput: any = useRef(null);

  const [isDeleteAcc, setIsDeleteAcc] = useState(false);
  const [openConfirmGroupExit, setConfirmGroupExit] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const handleEditProfileModal = () => {
    setEditProfileModal(false);
    setProfileOnModal(null);
    setIsAvatarEditor(false);
    setIsSlider(false);
  };
  const [exitGroup, setExitGroup] = useState([]);
  const handleDeleteModaClose = () => setIsDeleteAcc(false);

  const { isProfileLoaded, isSignedIn, isSettingsUpdated } = useSelector(state => state.account);
  const { productData } = useSelector(state => state.subscription);
  const { isProfileUpdating } = useSelector(state => state.account);
  const userId = useSelector(state => state.account.user?._id);
  const [open, setOpen] = useState(false);
  let initialRender = true;
  const subscriptionDetail = useSelector(state => state.subscription.data);
  const handleFields = () => {
    setAddFields(prev => !prev);
  };
  const handleClose = () => setOpen(false);
  const currentTimeStamp = new Date().valueOf();
  const timezoneList = moment.tz.names();
  const initialTimeZone = useSelector(state => state.account.settings.timeZone);
  const timeZone = initialTimeZone === '' ? moment.tz.guess() : initialTimeZone;
  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6)
      .max(255)
      .required('Old Password is required'),
    newPassword: Yup.string()
      .min(6)
      .max(255)
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .min(6)
      .max(255)
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.newPassword === value;
      }),
    phone: Yup.string().max(15)
  });
  const teams = useSelector(state => state.team?.heirarchyTeams);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const filteredTeam = teams?.filter(team => team._id !== goswimGroupId);
  const certificateOption: MultiSelectOption[] = useMemo(() => {
    return (
      (user?.certificate &&
        user?.certificate?.length > 0 &&
        setAutoCompleteCertificateValue(user.certificate, certificateType)) ||
      certificateType
    );
  }, [user]);

  const maxPricedProduct: IGetSubscriptionProducts | null = getMaxPriceProduct(productData);

  const initialValues: FormikInitialValues = useMemo(() => {
    let timezone = [];
    timezone.push(user?.settings?.timeZone);
    return {
      city: user?.city || '',
      country: user?.country || '',
      zipcode: user?.zipcode || '',
      state: user?.state || '',
      email: user?.email || '',
      fullName: user?.full_name || '',
      phone: user?.phone || '',
      designation: user?.designation || '',
      experience: user?.experience || '',
      address1: user?.address_line1 || '',
      address2: user?.address_line2 || '',
      tz: [timeZone],
      use_hd_video: user?.settings?.use_hd_video || false,
      autoplay_video: user?.settings?.autoplay_video || false,
      dateFormat: user?.settings?.dateFormat || DateFormat.MONTHDATE,
      email_notification_enabled: user?.email_notification_enabled || false,
      promotion_enabled: user?.promotion_enabled || false,
      certificates: setCertificatesValue(user?.certificate, certificateOption)
    };
  }, [user, certificateOption]);

  const profileInformation =
    profilePicture || typeof profilePicture === 'string'
      ? profilePicture instanceof Object
        ? URL.createObjectURL(profilePicture)
        : ''
      : (lastUpdatedPictureTimestamp &&
          user?.profile_picture_url &&
          `${user?.profile_picture_url}`) ||
        '';
  useEffect(() => {
    const dispatchMethod = isProfileLoaded ? getProfile : updateProfileStatus;
    if (isSettingsUpdated) dispatch(dispatchMethod());
  }, [isSettingsUpdated]); // eslint-disable-line

  const handleRemovePicture = () => {
    setProfilePicture('');
    setIsAvatarEditor(false);
    setIsSlider(false);
  };

  /** to make the image fit in the component on the initial load */
  const handleZoomValue = (imageInfo: ImageState) => {
    if (minZoomValue === zoomValue && (imageInfo.width > 300 || imageInfo.height > 300)) {
      const largerSize =
        (imageInfo.width > imageInfo.height && imageInfo.width) || imageInfo.height;
      setzoomValue(300 / largerSize);
      setMinZoomValue(300 / largerSize);
    }
  };

  function dataURLtoBlob(dataURL: any) {
    if (dataURL) {
      let array, binary, i, len;
      binary = atob(dataURL.split(',')[1]);
      array = [];
      i = 0;
      len = binary.length;
      while (i < len) {
        array.push(binary.charCodeAt(i));
        i++;
      }
      return new Blob([new Uint8Array(array)], {
        type: 'image/png'
      });
    }
  }

  useEffect(() => {
    dispatch(getTeamHeirarchy());
    dispatch(getSubscriptions());
  }, []);

  const handleExitGroup = (exitGroupID: any) => {
    let exitArray: any = [];
    exitArray.push(exitGroupID);
    setExitGroup(exitArray);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={profileValidation}
        onSubmit={async values => {
          let settingValues = {
            timeZone: values.tz[0] ? values.tz[0] : '',
            autoplay_video: values.autoplay_video,
            use_hd_video: values.use_hd_video,
            landingPage: SUBSCRIPTION_ROUTES.Account,
            serviceMaxPrice: 25,
            dateFormat: values.dateFormat
          };
          const urlBlob = dataURLtoBlob(avatarRef.current?.getImageScaledToCanvas()?.toDataURL());
          const finalImgFile = urlBlob && new File([urlBlob], `ProfileImg_${currentTimeStamp}`);
          try {
            const certificatesStringConcated =
              values.certificates && values.certificates.length
                ? values.certificates?.map(certificates => certificates.value)
                : [];
            const valuesToBeUpdated: FormikInitialValues = { ...values };
            delete valuesToBeUpdated.certificates;
            let updatedValues: UpdateUserProfile;
            let editedProfilePicture: any = null;
            if (avatarRef.current && profilePicture && typeof profilePicture !== 'string') {
              window.Buffer = window.Buffer || require('buffer').Buffer;
              dispatch(uploadProfileImgToS3Bucket(finalImgFile, user?._id));
              editedProfilePicture = finalImgFile?.name;
            } else if (profileInformation.length) {
              //profileInformation has profile url
              editedProfilePicture = null;
            } else if (profileInformation.length === 0) {
              //when profile img removed profileInformation = ''
              editedProfilePicture = '';
            }

            if (editedProfilePicture || typeof editedProfilePicture === 'string') {
              updatedValues = {
                ...valuesToBeUpdated,
                editedProfilePicture,
                certificate: certificatesStringConcated
              };
            } else {
              updatedValues = {
                ...valuesToBeUpdated,
                certificate: certificatesStringConcated
              };
            }
            setIsSlider(false);
            await dispatch(updateProfile(updatedValues));
            await dispatch(saveSettings(settingValues));

            setIsAvatarEditor(false);
            setProfilePicture(editedProfilePicture);
          } catch (error:any) {
            isAvatarEditor && setIsSlider(true);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
          isValid
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid className={clsx(classes.root, className)} container spacing={3} {...rest}>
              <Grid item xs={12} md={9} xl={8}>
                <Card className={clsx(classes.root, className)} {...rest}>
                  <div className={classes.titleWithBtn}>
                    <Typography variant="h2" className={classes.titleSection}>
                      Profile
                    </Typography>
                    <div>
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        className={classes.changePwd + ' ' + classes.xs}
                        onClick={() => setOpen(true)}
                      >
                        <LockOutlinedIcon /> Change
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        className={classes.changePwd + ' ' + classes.sm}
                        onClick={() => setOpen(true)}
                      >
                        Change Password
                      </Button>
                      {(user?.role === AccountType.SWIMMER || user?.role === AccountType.COACH) &&
                        subscriptionDetail?.store === StoreType.Stripe &&
                        maxPricedProduct?.id !== subscriptionDetail?.product_id && (
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            className={classes.upgradeAccount}
                            onClick={() =>
                              router.push({ pathname: `/app/plans` /*, state: 'upgrade' */ })
                            }
                          >
                            Upgrade
                          </Button>
                        )}
                    </div>
                  </div>

                  <CardContent className={classes.cardDiv}>
                    <Box className={classes.avatarHldr}>
                      {profileInformation && (
                        <TooltipComponent title="Remove image">
                          <DeleteIconOutline
                            className={classes.deleteIcon}
                            onClick={handleRemovePicture}
                          />
                        </TooltipComponent>
                      )}
                      {!isAvatarEditor && (
                        <input
                          accept="image/.jpeg,.jpg,.png"
                          className={classes.input}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setIsAvatarEditor(true);
                            setIsSlider(true);
                            setMinZoomValue(1);
                            setzoomValue(1.2); //old: 1.2
                            setPosition({ x: 0.5, y: 0.5 });
                            event.target.files &&
                              event.target.files[0] &&
                              setProfilePicture(event.target.files[0]);
                          }}
                          id="raised-button-file"
                          type="file"
                        />
                      )}
                      <div className={classes.avatarWrapper}>
                        <label htmlFor="raised-button-file">
                          {!isAvatarEditor && (
                            <Avatar
                              type="cam"
                              className={classes.avatar}
                              variant="circle"
                              canEdit
                              src={profileInformation}
                              srcSet={profileInformation}
                            />
                          )}
                          {isAvatarEditor && editProfileModal && profileInformation && (
                            <Avatar
                              type="cam"
                              className={classes.avatar}
                              variant="circle"
                              canEdit
                              src={profileInformation}
                              srcSet={profileInformation}
                            />
                          )}
                          {isAvatarEditor && !editProfileModal && (
                            <AvatarEditor
                              ref={avatarRef}
                              image={(isAvatarEditor && profilePicture) || ''}
                              className={classes.avatar}
                              width={250}
                              height={250}
                              border={1}
                              position={isAvatarEditor && position}
                              onPositionChange={imageinfo =>
                                isAvatarEditor && setPosition(imageinfo)
                              }
                              onLoadSuccess={isAvatarEditor && handleZoomValue}
                              borderRadius={150}
                              color={isAvatarEditor && [256, 256, 256, 1]}
                              scale={isAvatarEditor && zoomValue}
                            />
                          )}

                          {isSlider && !editProfileModal && (
                            <Slider
                              ValueLabelComponent={ValueLabelComponent}
                              value={zoomValue}
                              onChange={(_1: React.ChangeEvent<{}>, value: number | number[]) =>
                                !Array.isArray(value) && isSlider && setzoomValue(value)
                              }
                              aria-labelledby="zoom"
                              min={minZoomValue}
                              max={2}
                              step={0.01}
                              defaultValue={1}
                            />
                          )}

                          {!editProfileModal &&
                            (isAvatarEditor ||
                              (profilePicture === '' && user?.profile_picture_url)) && (
                              <Box>
                                <TooltipComponent title="Update">
                                  <IconButton
                                    color="secondary"
                                    disabled={isSubmitting}
                                    type="submit"
                                    style={{
                                      marginTop: (isSlider && '0') || '15px',
                                      marginBottom: '5px'
                                    }}
                                    size="large"
                                  >
                                    <CheckCircleIcon fontSize="large" />

                                    {isSubmitting ? (
                                      <CircularProgress size={20} className={classes.actionIcon} />
                                    ) : (
                                      ''
                                    )}
                                  </IconButton>
                                </TooltipComponent>
                              </Box>
                            )}
                        </label>
                        <div className={classes.userDetails}>
                          <div className={classes.userNameField}>
                            <TextField
                              id="standard-basic"
                              className={classes.name}
                              value={values.fullName}
                              name="fullName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputRef={textInput}
                              error={errors.fullName}
                              variant="standard"
                            />
                          </div>
                          <Typography variant="h4">{user?.email}</Typography>
                        </div>
                      </div>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.editProfileBtn}
                      onClick={() => {
                        setEditProfileModal(true);
                      }}
                    >
                      Edit Profile
                    </Button>

                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Grid container spacing={3}>
                          {user?.role === AccountType.COACH_OR_SWIMMING_EXPERT && (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.designation && errors.designation)}
                                fullWidth
                                helperText={touched.designation && errors.designation}
                                label="Designation"
                                name="designation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.designation}
                                variant="outlined"
                              />
                            </Grid>
                          )}
                          {user?.role === AccountType.COACH_OR_SWIMMING_EXPERT && (
                            <Grid item md={6} xs={12}>
                              <Autocomplete
                                multiple
                                id="certificate"
                                options={certificateOption}
                                className={!isFocus ? classes.certificates : undefined}
                                getOptionLabel={option => {
                                  const title =
                                    (option.isNewValue &&
                                      !option.title.indexOf('Add') &&
                                      option.title.slice(5, -1)) ||
                                    option.title;
                                  return title;
                                }}
                                isOptionEqualToValue={(option, value) =>
                                  option.title === value.title
                                }
                                value={values.certificates}
                                onChange={(_1, value) => {
                                  setFieldValue('certificates', value);
                                }}
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                                  if (params.inputValue !== '') {
                                    filtered.push({
                                      title: `Add "${params.inputValue.replace(',', '')}"`,
                                      value: params.inputValue.replace(',', ''),
                                      isNewValue: true
                                    });
                                  }
                                  return filtered;
                                }}
                                disableCloseOnSelect
                                renderTags={tag => {
                                  if (isFocus) {
                                    return tag?.map((tags, index) => (
                                      <Typography component="span" key={index}>
                                        {(index ? ', ' : '') + tags.value}
                                      </Typography>
                                    ));
                                  } else {
                                    return (
                                      <Typography noWrap>
                                        {tag?.map(options => options.value).join(', ')}
                                      </Typography>
                                    );
                                  }
                                }}
                                renderOption={(option, { selected }) => {
                                  if (option.isNewValue) {
                                    return option.title;
                                  }
                                  return (
                                    <>
                                      <Checkbox
                                        id={option.title}
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                      />
                                      {option.title}
                                    </>
                                  );
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    error={Boolean(touched.certificates && errors.certificates)}
                                    helperText={touched.certificates && errors.certificates}
                                    variant="outlined"
                                    label="Certificate & Licence"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                  />
                                )}
                              />
                            </Grid>
                          )}
                          {user?.role === AccountType.COACH_OR_SWIMMING_EXPERT && (
                            <Grid item md={12} xs={12}>
                              <TextField
                                error={Boolean(touched.experience && errors.experience)}
                                fullWidth
                                helperText={touched.experience && errors.experience}
                                label="Experience"
                                name="experience"
                                multiline
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.experience}
                                variant="outlined"
                              />
                            </Grid>
                          )}
                          <Grid item xs={12}>
                            <Typography variant="h4" className={classes.subTitle}>
                              Role
                            </Typography>
                            <Chip
                              color="primary"
                              label={user?.role}
                              className={classes.GroupItems}
                              variant="outlined"
                            />
                          </Grid>
                          {filteredTeam?.length ? (
                            <Grid item xs={12}>
                              <Typography variant="h4" className={classes.subTitle}>
                                Groups
                              </Typography>
                              {filteredTeam?.map((team, index) => (
                                <Chip
                                  key={index}
                                  color={team?.member_id === userId ? 'success' : 'primary'}
                                  label={team.name}
                                  className={classes.GroupItems}
                                  variant="outlined"
                                  clickable={true}
                                  onClick={() => {
                                    router.push(`train/${team._id}`);
                                  }}
                                  onDelete={() => {
                                    handleExitGroup(team._id);
                                    setConfirmGroupExit(true);
                                  }}
                                />
                              ))}
                            </Grid>
                          ) : (
                            ''
                          )}

                          <Grid item xs={12}>
                            <Typography variant="h4" className={classes.subTitleWithoutSpacing}>
                              Additional Details
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} className={classes.labelWrapper}>
                            <Typography variant="h5">Time Zone</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {timezoneList && (
                              <>
                                <MultiSelectWithSearch
                                  id="tz"
                                  multiple={false}
                                  value={values.tz}
                                  setOnChange={(value: string[]) =>
                                    setFieldValue('tz', value as string[])
                                  }
                                  option={timezoneList}
                                  label="Timezone"
                                />
                                <Typography variant="body1" className={classes.errMsg}>
                                  {touched.tz && errors.tz}
                                </Typography>
                              </>
                            )}
                          </Grid>
                          <Grid item sm={6} className={classes.labelWrapper}>
                            <Typography variant="h5">Playback Options</Typography>
                          </Grid>
                          <Grid item sm={6}>
                            <FormGroup aria-label="position" row className={classes.playbackCheck}>
                              <FormControlLabel
                                value="useHighDefinitionAudio"
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={values.use_hd_video}
                                    onChange={e => setFieldValue('use_hd_video', e.target.checked)}
                                  />
                                }
                                label="Use High Definition video"
                                labelPlacement="end"
                              />
                              <FormControlLabel
                                value="autoPlayVideos"
                                control={
                                  <Checkbox
                                    name="autoplay_video"
                                    color="primary"
                                    checked={values.autoplay_video}
                                    onChange={e =>
                                      setFieldValue('autoplay_video', e.target.checked)
                                    }
                                  />
                                }
                                label="Autoplay Videos"
                                labelPlacement="end"
                              />
                            </FormGroup>
                          </Grid>

                          <Grid item xs={12}>
                            <Box
                              display="flex"
                              justifyContent="left"
                              alignItems="center"
                              width="100%"
                            >
                              <Typography variant="h4" className={classes.personalDetail}>
                                Personal Details
                              </Typography>
                              {!addFields ? (
                                <TooltipComponent title="show more fields">
                                  <IconButton
                                    color="secondary"
                                    onClick={handleFields}
                                    className={classes.expand}
                                    size="large"
                                  >
                                    <ExpandMoreIcon fontSize="large" />
                                  </IconButton>
                                </TooltipComponent>
                              ) : (
                                <TooltipComponent title="hide">
                                  <IconButton
                                    color="secondary"
                                    onClick={handleFields}
                                    className={classes.expand}
                                    size="large"
                                  >
                                    <ExpandLessIcon fontSize="large" />
                                  </IconButton>
                                </TooltipComponent>
                              )}
                            </Box>
                            <Collapse in={addFields} timeout={500}>
                              <Grid container spacing={3} className={classes.pt}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.phone && errors.phone)}
                                    fullWidth
                                    helperText={touched.phone && errors.phone}
                                    label="Phone Number"
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.address1 && errors.address1)}
                                    fullWidth
                                    helperText={touched.address1 && errors.address1}
                                    label="Address"
                                    name="address1"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="address"
                                    value={values.address1}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.address2 && errors.address2)}
                                    fullWidth
                                    helperText={touched.address2 && errors.address2}
                                    label="Address line 2"
                                    name="address2"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="address2"
                                    value={values.address2}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.city && errors.city)}
                                    fullWidth
                                    helperText={touched.city && errors.city}
                                    label="City"
                                    name="city"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="city"
                                    value={values.city}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.state && errors.state)}
                                    fullWidth
                                    helperText={touched.state && errors.state}
                                    label="State"
                                    name="state"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="state"
                                    value={values.state}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.country && errors.country)}
                                    fullWidth
                                    helperText={touched.country && errors.country}
                                    label="Country"
                                    name="country"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="country"
                                    value={values.country}
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    error={Boolean(touched.zipcode && errors.zipcode)}
                                    fullWidth
                                    helperText={touched.zipcode && errors.zipcode}
                                    label="Zipcode"
                                    name="zipcode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="zipcode"
                                    value={values.zipcode}
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                            </Collapse>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              value={values.email_notification_enabled}
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={values.email_notification_enabled}
                                  onChange={e =>
                                    setFieldValue('email_notification_enabled', e.target.checked)
                                  }
                                />
                              }
                              label="I want to receive email from GoSwim"
                              labelPlacement="end"
                              className={classes.checkBoxFullWidth}
                            />
                            <FormControlLabel
                              value={values.promotion_enabled}
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={values.promotion_enabled}
                                  onChange={e =>
                                    setFieldValue('promotion_enabled', e.target.checked)
                                  }
                                />
                              }
                              label="I want to receive the GoSwim Newsletter"
                              labelPlacement="end"
                              className={classes.checkBoxFullWidth}
                            />
                            {/* </FormGroup> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box width="100%">
                    <Divider />
                  </Box>

                  <Box p={2} display="flex" justifyContent="flex-end">
                    {false && (
                      <Button
                        variant="outlined"
                        className={classes.deleteBtn}
                        startIcon={<DeleteOutlinedIcon />}
                        onClick={() => setIsDeleteAcc(true)}
                        size="small"
                      >
                        Delete My Account
                      </Button>
                    )}
                    <LoadingButton
                      color="secondary"
                      type="submit"
                      variant="contained"
                      isLoading={isSubmitting}
                      isValid={isValid}
                      progressSize={20}
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={() => {
                        if (errors.fullName) window.scrollTo(0, 0);
                      }}
                    >
                      <Typography component="span" className={classes.buttonText}>
                        Save
                      </Typography>
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <ConfirmGroupExit
              open={openConfirmGroupExit}
              close={() => setConfirmGroupExit(false)}
              exitGroup={exitGroup}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              className={classes.changePwdModal}
            >
              <div>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                  CHANGE PASSWORD
                </DialogTitle>
              </div>
              <Formik
                initialValues={{
                  oldPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={passwordValidationSchema}
                onSubmit={async values => {
                  if (user) dispatch(changePassword(values.oldPassword, values.confirmPassword));
                  setOpen(false);
                }}
              >
                {({ handleSubmit, handleBlur, handleChange, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            id="outlined-basic"
                            label="Old Password"
                            name="oldPassword"
                            error={Boolean(touched.oldPassword && errors.oldPassword)}
                            helperText={touched.oldPassword && errors.oldPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type="password"
                          />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            id="outlined-basic"
                            label="New Password"
                            name="newPassword"
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            fullWidth
                            type="password"
                          />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            id="outlined-number"
                            name="confirmPassword"
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            label="Confirm Password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            variant="outlined"
                          />
                          {errors.confirmPassword && (
                            <div className={classes.errMsg}>{errors.confirmPassword}</div>
                          )}
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                      <Button onClick={handleClose} color="primary" size="small">
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" color="primary" size="small">
                        <Typography component="span" className={classes.buttonText}>
                          Save
                        </Typography>
                      </Button>
                    </DialogActions>
                  </form>
                )}
              </Formik>
            </Dialog>

            <Dialog
              open={isDeleteAcc}
              onClose={handleDeleteModaClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                Delete My Account
              </DialogTitle>
              <DialogContent className={classes.deleteSec}>
                <InfoOutlinedIcon className={classes.infoIcon} />
                <Typography variant="body1" align="center">
                  If you delete your account, all your data will be lost and not able to retrieve.
                  are you sure want to delete your account?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteModaClose} color="primary" size="small">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    await dispatch(deleteAccount(user ? user?._id : ''));
                    handleDeleteModaClose();
                    await dispatch(logout());
                  }}
                >
                  <Typography component="span" className={classes.buttonText}>
                    Delete
                  </Typography>
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      </Formik>
      <Dialog
        open={editProfileModal}
        onClose={handleEditProfileModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle variant="h4">Edit Profile</DialogTitle>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={profileValidation}
          onSubmit={async values => {
            {
              let settingValues = {
                timeZone: values.tz[0] ? values.tz[0] : '',
                autoplay_video: values.autoplay_video,
                use_hd_video: values.use_hd_video,
                landingPage: SUBSCRIPTION_ROUTES.Account,
                serviceMaxPrice: 25,
                dateFormat: values.dateFormat
              };
              const urlBlob = dataURLtoBlob(
                avatarRef.current?.getImageScaledToCanvas()?.toDataURL()
              );
              const finalImgFile = urlBlob && new File([urlBlob], `ProfileImg_${currentTimeStamp}`);
              try {
                const certificatesStringConcated =
                  values.certificates && values.certificates.length
                    ? values.certificates?.map(certificates => certificates.value)
                    : [];
                const valuesToBeUpdated: FormikInitialValues = { ...values };
                delete valuesToBeUpdated.certificates;
                let updatedValues: UpdateUserProfile;
                let editedProfilePicture: any = null;
                if (avatarRef.current && profileOnModal && typeof profileOnModal !== 'string') {
                  window.Buffer = window.Buffer || require('buffer').Buffer;
                  dispatch(uploadProfileImgToS3Bucket(finalImgFile, user?._id));
                  editedProfilePicture = finalImgFile?.name;
                } else if (profileInformation.length) {
                  //profileInformation has profile url
                  editedProfilePicture = null;
                } else if (profileInformation.length === 0) {
                  //when profile img removed profileInformation = ''
                  editedProfilePicture = '';
                }

                if (editedProfilePicture || typeof editedProfilePicture === 'string') {
                  updatedValues = {
                    ...valuesToBeUpdated,
                    editedProfilePicture,
                    certificate: certificatesStringConcated
                  };
                } else {
                  updatedValues = {
                    ...valuesToBeUpdated,
                    certificate: certificatesStringConcated
                  };
                }
                setIsSlider(false);
                await dispatch(updateProfile(updatedValues));
                await dispatch(saveSettings(settingValues));

                setIsAvatarEditor(false);
                setProfilePicture(editedProfilePicture);
                handleEditProfileModal();
              } catch (error:any) {
                isAvatarEditor && setIsSlider(true);
                handleEditProfileModal();
              }
            }
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, errors, touched, values, isValid }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="fullName"
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      type="text"
                      value={values.fullName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      label="Email"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      value={values.email}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                  Change Profile Picture
                </Typography>

                {profileInformation && !profileOnModal && (
                  <Box>
                    <img
                      src={profileInformation}
                      alt="profile picture"
                      className={classes.profileInModal}
                    />
                  </Box>
                )}
                <Box sx={{ mb: 2 }}>
                  <Button variant="contained" component="label">
                    Upload Picture
                    <input
                      accept="image/.jpeg,.jpg,.png"
                      className={classes.input}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setIsAvatarEditor(true);
                        setIsSlider(true);
                        setMinZoomValue(1);
                        setzoomValue(1.2);
                        setPosition({ x: 0.5, y: 0.5 });
                        event.target.files &&
                          event.target.files[0] &&
                          setProfileOnModal(event.target.files[0]);
                      }}
                      id="raised-button-file"
                      type="file"
                    />
                  </Button>
                </Box>

                {isAvatarEditor && (
                  <AvatarEditor
                    ref={avatarRef}
                    image={(isAvatarEditor && profileOnModal) || ''}
                    className={classes.avatar}
                    width={250}
                    height={250}
                    border={1}
                    position={isAvatarEditor && position}
                    onPositionChange={imageinfo => isAvatarEditor && setPosition(imageinfo)}
                    onLoadSuccess={isAvatarEditor && handleZoomValue}
                    borderRadius={150}
                    color={isAvatarEditor && [256, 256, 256, 1]}
                    scale={isAvatarEditor && zoomValue}
                  />
                )}
                {isSlider && (
                  <Slider
                    ValueLabelComponent={ValueLabelComponent}
                    value={zoomValue}
                    onChange={(_1: React.ChangeEvent<{}>, value: number | number[]) =>
                      !Array.isArray(value) && isSlider && setzoomValue(value)
                    }
                    aria-labelledby="zoom"
                    min={minZoomValue}
                    max={2}
                    step={0.01}
                    defaultValue={1}
                  />
                )}
              </DialogContent>

              <Divider />
              <DialogActions sx={{ my: 0.25, mx: 1 }}>
                <Button variant="outlined" onClick={handleEditProfileModal}>
                  Cancel
                </Button>
                <LoadingButton
                  color="secondary"
                  type="submit"
                  variant="contained"
                  isLoading={isProfileUpdating}
                  isValid={isValid}
                  progressSize={20}
                  size="large"
                >
                  <Typography component="span" className={classes.buttonText}>
                    Save
                  </Typography>
                </LoadingButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default GeneralSettings;
