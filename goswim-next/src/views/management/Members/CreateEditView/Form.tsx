import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Typography,
  IconButton,
  Collapse,
  CircularProgress,
  alpha,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Save as SaveIcon } from 'react-feather';
import { ComponentProps } from 'src/types/components';
import { MultiSelectOption } from 'src/types';
import { AccountType, AgeType, Status, SubscriptionStatus } from 'src/constants';
import Label from 'src/components/Label';
import LoadingButton from 'src/components/LoadingButton';
import { sortTeam } from 'src/utils/sortTeam';
import clsx from 'clsx';
import TooltipComponent from 'src/components/Tooltip';
import {
  createMember,
  MemberData,
  updateMember,
  MemberRole,
  checkExistingMember
} from 'src/store/management/members';
import config from 'src/config';
import { MultiSelectWithSearch } from 'src/components/MultiSelectWithSearch';
import { getTeamHeirarchy } from 'src/store/management/team';
import { adminSignInUser, forgetPassword } from 'src/store/goswim/account';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ConfirmRoleChangeModal from './ConfirmRoleChange';
import LoadingScreen from 'src/components/LoadingScreen';
import ResetPassword from 'src/components/ResetPassword';
import { useRouter } from 'next/router';

export type FormType = 'create' | 'edit' | 'view';

interface FormProps {
  type: FormType;
  member?: MemberData;
  title?: string;
  isInfoView?: boolean;
}

export interface InitialValuesWihtoutRoster {
  full_name?: string;
  email: string;
  team: string[] | undefined;
  account_name?: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  can_add_team: boolean;
  can_manage_current_teams: boolean;
  role?: MemberRole | null | string;
  submit?: string;
  isAgeEligible: boolean;
  secondary_email?: string;
  promotion_enabled?: boolean;
  dob?: string;
  split?: number;
  has_profile_picture?: boolean;
}
export interface InitialValues extends InitialValuesWihtoutRoster {
  roster_group?: MultiSelectOption[];
}

export interface UpdatedValues extends InitialValuesWihtoutRoster {
  roster_group?: string[];
}

const useStyles = makeStyles(theme => ({
  cbAllowAddTeam: {
    [theme.breakpoints.down('sm')]: { justifyContent: 'start' },
    [theme.breakpoints.only('lg')]: { flexGrow: 1, maxWidth: '46.333333%' }
  },
  roleRadioButton: {
    '& fieldset': {
      width: '100%',
      border: '#ccc solid 1px',
      borderRadius: '4px',
      padding: '5px 0 6px 15px',
      marginTop: '-10px'
    },
    '& legend': {
      fontSize: '12px',
      padding: '0 10px'
    }
  },
  rosterGroupEdit: {
    '& .MuiAutocomplete-inputRoot': {
      flexWrap: 'nowrap'
    }
  },
  roster: {
    '& .MuiAutocomplete-input ': {
      display: 'none'
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] ': {
      minHeight: 56
    }
  },
  mail: {
    padding: 0,
    marginTop: 16,
    color: theme.palette.background.dark
  },
  marginTop: {
    width: '100%',
    marginTop: 16
  },
  chipCust: {
    marginRight: 3,
    marginBottom: 5,
    backgroundColor: theme.palette.background.dark
  },
  buttonText: { fontWeight: 500, color: theme.palette.common.white },
  formRoot: {
    '& .MuiFormLabel-root.Mui-disabled': {
      color: theme.palette.text.secondary
    }
  },
  saveBtn: {
    color: theme.palette.common.white
  },
  alertSection: {
    backgroundColor: alpha('#ff0000', 0.2),
    padding: theme.spacing(1),
    fontWeight: 500,
    borderRadius: theme.spacing(0.5)
  },
  chip: {
    margin: '0 4px 4px 4px',
    background: alpha(theme.palette.primary.main, 0.04)
  },
  cardHeaderWithActions: {
    // padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    '& button:nth-last-child(2)': {
      marginRight: theme.spacing(1.5)
    }
  },
  toggleButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const retrieveLabel = (status?: string) => {
  switch (status) {
    case SubscriptionStatus.ACTIVE.toLowerCase():
      return <Label color="success">{Status.ACTIVE}</Label>;

    case SubscriptionStatus.UNSUBSCRIBED.toLowerCase():
      return <Label color="error">{Status.UNSUBSCRIBED}</Label>;

    case SubscriptionStatus.TRAILING.toLocaleLowerCase():
      return <Label color="success">{Status.TRAILING}</Label>;

    default:
      return <Label color="error">{Status.INACTIVE}</Label>;
  }
};

const Form: React.FC<ComponentProps & FormProps> = ({
  className,
  type,
  member,
  title,
  isInfoView = false,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useRouter();
  const {
    isLoading,
    teamData,
    existingMember,
    checkingMember,
    memberDetail,
    currentSelectedTeam,
    userName,
    userType
  } = useSelector(state => ({
    isLoading: state.members.isLoading,
    checkingMember: state.members.checkingMember,
    teamData: state.team.heirarchyTeams,
    persistTeam: state.common.persist.teamValues,
    currentSelectedTeam: state.members.currentSelectedTeam,
    subscription: state.subscription.data,
    existingMember: state.members.existingMember,
    memberDetail: state.members.member,
    userName: state.account.user?.full_name,
    userType: state.account.user?.role
  }));
  const [loginLoader, setLoginLoader] = useState<boolean>(false);
  const userRole = useSelector(state => state.account.user?.role || AccountType.SWIMMER);
  const [addFields, setAddFields] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmRoleChangeModal, setConfirmRoleChangeModal] = useState(false);
  const handleFields = () => {
    setAddFields(prev => !prev);
  };
  const selectedTeam = useRef<any>([]);
  const goswimGroupId = config.goswimGroupAPI.groupId;
  const filteredTeamData = teamData && teamData.filter(team => team._id !== goswimGroupId);
  const sortedTeams = useMemo(() => filteredTeamData && sortTeam(filteredTeamData), [
    filteredTeamData
  ]);
  const findExistMemberGroup = filteredTeamData?.filter(memberTeam => {
    return memberDetail?.team?.some((team: any) => team === memberTeam._id);
  });
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userRole === AccountType.ADMIN) {
      dispatch(getTeamHeirarchy());
    }
  }, []);

  const initialTeamNew = () => {
    let initialTeams;

    if (type === 'create') {
      if (currentSelectedTeam === 'ALL') {
        initialTeams = selectedTeam.current.length ? selectedTeam.current : [];
      } else {
        initialTeams = filteredTeamData?.filter(team => team._id === currentSelectedTeam);
      }
    } else {
      initialTeams = findExistMemberGroup;
    }

    return initialTeams;
  };

  const initialValues: InitialValues = {
    full_name: existingMember?.full_name || member?.full_name || '',
    email: existingMember?.email || member?.email || email || '',
    team: initialTeamNew(),
    account_name: existingMember?.account_name || member?.account_name || '',
    phone: existingMember?.phone || member?.phone || '',
    address_line1: existingMember?.address_line1 || member?.address_line1 || '',
    address_line2: existingMember?.address_line2 || member?.address_line2 || '',
    city: existingMember?.city || member?.city || '',
    zipcode: existingMember?.zipcode || member?.zipcode || '',
    state: existingMember?.state || member?.state || '',
    country: existingMember?.country || member?.country || '',
    role: existingMember?.role || member?.role || AccountType.SWIMMER,
    can_add_team: existingMember?.can_add_team || member?.can_add_team || false,
    can_manage_current_teams:
      existingMember?.can_manage_current_teams || member?.can_manage_current_teams || false,
    isAgeEligible: (existingMember?.isAgeEligible || member?.isAgeEligible) ?? false,
    secondary_email: existingMember?.secondary_email ?? member?.secondary_email ?? '',
    promotion_enabled: existingMember?.promotion_enabled ?? member?.promotion_enabled ?? false,
    dob: existingMember?.dob || member?.dob || '',
    split: existingMember?.split || member?.split ? member?.split : 0
  };
  const getUserRole = (role?: string | null) => {
    if (role) {
      const isSwimmer = [
        AccountType.SWIMMER,
        AccountType.SWIMMER,
        AccountType.SWIMMER_OR_PARENT,
        AccountType.PARENT
      ].some(x => x === (role as AccountType));

      const isCoach = [AccountType.COACH_OR_SWIMMING_EXPERT, AccountType.COACH].some(
        x => x === (role as AccountType)
      );

      return isSwimmer ? AccountType.SWIMMER : isCoach ? AccountType.COACH : role;
    } else {
      return AccountType.SWIMMER;
    }
  };

  const isSwimmer = (role?: string | null) => {
    if (role) {
      const isSwimmer = [
        AccountType.SWIMMER,
        AccountType.ATHLETE,
        AccountType.SWIMMER_OR_PARENT,
        AccountType.PARENT
      ].some(x => x === (role as AccountType));
      return isSwimmer ? true : false;
    } else {
      return true;
    }
  };

  const isCoach = (role?: string | null) => {
    if (role) {
      const isCoach = [
        AccountType.COACH,
        AccountType.COACH_OR_SWIMMING_EXPERT,
        AccountType.EXPERT
      ].some(x => x === (role as AccountType));
      return isCoach ? true : false;
    } else {
      return false;
    }
  };

  const showSecondaryEmail = (role?: string | null, isAgeEligible?: boolean | true) => {
    if (isSwimmer(role) && !isAgeEligible) {
      return true;
    } else {
      return false;
    }
  };

  const getAge = (age?: boolean | null) => {
    if (age === null || age) {
      return AgeType.AGEABOVE;
    } else {
      return AgeType.AGEBELOW;
    }
  };

  const getPercentageNumber = (event: any) => {
    let value = event.target.value;
    if (value < 0) {
      return 0;
    } else if (value > 100) {
      return 100;
    }
    return value;
  };

  const handleEmailBlur = (email: string) => {
    if (email) dispatch(checkExistingMember(email));
  };
  let commanSchema = Yup.object().shape({
    full_name: Yup.string()
      .max(255)
      .required('Full Name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    account_name: Yup.string().max(255),
    roster_group: Yup.string()
      .nullable()
      .max(255),
    phone: Yup.string().max(15),
    role: Yup.string()
      .nullable()
      .required('Role is required'),
    isAgeEligible: Yup.boolean(),
    secondary_email: Yup.string()
      .email('Must be a valid email')
      .max(255),
    address_line1: Yup.string().max(255),
    address_line2: Yup.string().max(255),
    city: Yup.string().max(255),
    zipcode: Yup.string().max(255),
    state: Yup.string().max(255),
    country: Yup.string().max(255),
    can_add_team: Yup.boolean()
  });

  const teamSchema = Yup.object().shape({
    team: Yup.string()
      .max(1000)
      .nullable()
      .required('Team is required')
  });
  const isAdmin = userType === AccountType.ADMIN;

  if (!isAdmin) commanSchema = commanSchema.concat(teamSchema);
  if (loginLoader) {
    return <LoadingScreen />;
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={commanSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async values => {
        if (
          (type === 'edit' && member?.role !== values.role) ||
          (type === 'create' && existingMember && existingMember?.role !== values?.role)
        ) {
          setConfirmRoleChangeModal(true);
        } else {
          let formatedTeams: any[] = [];
          values?.team &&
            values?.team?.length > 0 &&
            values.team.map((team: any) => {
              if (typeof team === 'object') {
                formatedTeams.push(team._id);
              } else formatedTeams.push(team);
            });
          values.team = formatedTeams;

          if (userRole === AccountType.COACH) delete values.role;
          const initialValue: InitialValues = {
            ...values
          };

          if (values.secondary_email && values.secondary_email.trim().length > 0) {
            initialValue.isAgeEligible = false;
          } else {
            initialValue.isAgeEligible = true;
          }

          delete initialValue.roster_group;

          const updatedValues: UpdatedValues = {
            ...initialValue,
            roster_group: []
          };

          const payload = (type === 'edit' && member?._id) || ``;
          const teams = values?.team?.map((team: any) => team);

          if (type === 'create' && userName && teams) {
            dispatch(createMember({ values: updatedValues, history }, teams, userName));
          }
          if (type === 'edit') {
            dispatch(updateMember({ values: updatedValues, history }, payload));
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        values,
        isValid
      }) => (
        <form className={clsx(classes.formRoot, className)} onSubmit={handleSubmit} {...rest}>
          <Card>
            <Box className={classes.cardHeaderWithActions}>
              <CardHeader title={title || 'Add Member'} />
              {type === 'edit' && userRole === AccountType.ADMIN && (
                <Box>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<LockOutlinedIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Reset Password
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AccountCircleOutlinedIcon />}
                    onClick={() => {
                      setLoginLoader(true);
                      dispatch(adminSignInUser(member ? member._id : '', history));
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              )}
            </Box>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {/* Primary mail */}
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label={`Email Address${isInfoView ? ' ' : ' *'}`}
                    name="email"
                    onBlur={e => handleEmailBlur(e.target.value)}
                    onChange={e => {
                      setEmail((e.target as HTMLInputElement).value);
                      setFieldValue('email', (e.target as HTMLInputElement).value);
                    }}
                    value={values.email || email}
                    InputProps={{
                      endAdornment: checkingMember && (
                        <>
                          <CircularProgress size={20} />
                        </>
                      )
                    }}
                    variant="outlined"
                    disabled={isInfoView}
                  />
                </Grid>
                {/* Full name */}
                <Grid item md={6} xs={12}>
                  <TextField
                    autoFocus
                    error={Boolean(touched.full_name && errors.full_name)}
                    fullWidth
                    helperText={touched.full_name && errors.full_name}
                    label={`Full Name *${isInfoView ? ' ' : ' '}`}
                    name="full_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.full_name}
                    variant="outlined"
                    disabled={isInfoView}
                  />
                </Grid>
                {existingMember && userRole === AccountType.ADMIN ? (
                  <Grid item md={6} xs={12}>
                    <Box className={classes.alertSection}>
                      {existingMember?.full_name} {' is already a '} {existingMember?.role}
                    </Box>
                  </Grid>
                ) : (
                  ''
                )}
                {existingMember && userRole === AccountType.ADMIN ? (
                  <Grid item md={6} xs={12} />
                ) : (
                  ''
                )}
                {/* User role */}
                {userRole === AccountType.ADMIN && (
                  <Grid item lg={6} md={6} xs={12} className={classes.roleRadioButton}>
                    <Box>
                      <FormControl component="fieldset" error={!!errors.role}>
                        <FormLabel component="legend" disabled={isInfoView}>
                          {`Role${isInfoView ? ' ' : ' *'}`}
                        </FormLabel>

                        <RadioGroup
                          row
                          aria-label="role *"
                          name="role"
                          value={getUserRole(values.role)}
                          onChange={(_1, newRole) => {
                            if (!isInfoView) {
                              var value = newRole;
                              var isAdmin =
                                value.toUpperCase() === `${AccountType.ADMIN.toUpperCase()}` ||
                                value.toUpperCase() === `${AccountType.COACH.toUpperCase()}`;
                              setFieldValue('role', newRole);
                              setFieldValue('can_add_team', isAdmin);
                              setFieldValue('can_manage_current_teams', isAdmin);
                            }
                          }}
                        >
                          {userRole === AccountType.ADMIN && (
                            <FormControlLabel
                              value={AccountType.ADMIN}
                              control={<Radio />}
                              label={AccountType.ADMIN}
                            />
                          )}
                          {(userRole === AccountType.ADMIN || userRole === AccountType.COACH) && (
                            <FormControlLabel
                              value={AccountType.SWIMMER}
                              control={<Radio />}
                              label={AccountType.SWIMMER}
                            />
                          )}
                          {(userRole === AccountType.ADMIN || userRole === AccountType.COACH) && (
                            <FormControlLabel
                              value={AccountType.COACH}
                              control={<Radio />}
                              label={AccountType.COACH}
                            />
                          )}
                          {userRole === AccountType.ADMIN && (
                            <FormControlLabel
                              value={AccountType.CONTRACT}
                              control={<Radio />}
                              label={AccountType.CONTRACT}
                            />
                          )}
                          {userRole === AccountType.ADMIN && (
                            <FormControlLabel
                              value={AccountType.EVALUATOR}
                              control={<Radio />}
                              label={AccountType.EVALUATOR}
                            />
                          )}
                          {false && (
                            <FormControlLabel
                              value={AccountType.EXPERT}
                              control={<Radio />}
                              label={AccountType.EXPERT}
                            />
                          )}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                )}

                {/* Team */}
                {type === 'edit' || type === 'create' ? (
                  <Grid item md={6} xs={12}>
                    <MultiSelectWithSearch
                      id="team"
                      name="team"
                      error={Boolean(touched.team && errors.team)}
                      value={values.team}
                      helperText={touched.team && errors.team}
                      setOnChange={(value: string[]) => {
                        setFieldValue('team', value as string[]);
                      }}
                      option={sortedTeams}
                      label="Teams"
                      isMultiple={true}
                      disabled={isInfoView}
                    />
                  </Grid>
                ) : (
                  ''
                )}

                {isInfoView && (
                  <>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Subscription Status"
                        name="zipcode"
                        InputProps={{
                          startAdornment: (
                            <Typography variant="body2" color="textSecondary">
                              {retrieveLabel(memberDetail?.status)}
                            </Typography>
                          )
                        }}
                        variant="outlined"
                        disabled={isInfoView}
                      />
                    </Grid>
                  </>
                )}

                {/* Athlete age */}
                {false && (
                  <Grid item md={6} xs={12} className={classes.roleRadioButton}>
                    <Box>
                      <FormControl component="fieldset" error={!!errors.role}>
                        <FormLabel component="legend" disabled={isInfoView}>
                          {`Athlete Age${isInfoView ? ' ' : ' *'}`}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label="age *"
                          name="isAgeEligible"
                          value={getAge(values.isAgeEligible)}
                          onChange={(_2, newValue) => {
                            var value = newValue;
                            setFieldValue(
                              'isAgeEligible',
                              value.toUpperCase() === `${AgeType.AGEABOVE.toUpperCase()}`
                            );
                          }}
                        >
                          <FormControlLabel
                            value={AgeType.AGEABOVE}
                            control={<Radio />}
                            label={AgeType.AGEABOVE}
                          />
                          <FormControlLabel
                            value={AgeType.AGEBELOW}
                            control={<Radio />}
                            label={AgeType.AGEBELOW}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                )}
                {/* Athlete secondary email */}
                {showSecondaryEmail(values.role, values.isAgeEligible) && (
                  <Grid item lg={6} md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.secondary_email && errors.secondary_email)}
                      fullWidth
                      helperText={touched.secondary_email && errors.secondary_email}
                      label={`Parent\\Guardian Email Address`}
                      name="secondary_email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.secondary_email}
                      variant="outlined"
                      disabled={isInfoView}
                    />
                  </Grid>
                )}
                {(values.role === AccountType.EVALUATOR ||
                  values.role === AccountType.CONTRACT) && (
                    <Grid item lg={6} md={6} xs={12}>
                      <TextField
                        type="number"
                        error={Boolean(touched.secondary_email && errors.secondary_email)}
                        fullWidth
                        helperText={touched.secondary_email && errors.secondary_email}
                        label={`Split${isInfoView ? ' ' : ' *'}`}
                        name="split"
                        onBlur={handleBlur}
                        onChange={event => {
                          setFieldValue('split', getPercentageNumber(event));
                        }}
                        value={values.split}
                        variant="outlined"
                        disabled={isInfoView}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                      />
                    </Grid>
                  )}

                {/* Can add and manage group */}
                {isCoach(values.role) && false && (
                  <Grid item lg={6} md={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item lg={4} md={3} xs={12} className={classes.cbAllowAddTeam}>
                        <FormControlLabel
                          value="Can add new Groups?"
                          control={<Switch color="primary" />}
                          onChange={handleChange}
                          checked={values.can_add_team}
                          name="can_add_team"
                          label="Can add new Groups?"
                          labelPlacement="end"
                          disabled={values.role === AccountType.SWIMMER_OR_PARENT || isInfoView}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <FormControlLabel
                          value="Can manage current Groups?"
                          control={<Switch color="primary" />}
                          onChange={handleChange}
                          checked={values.can_manage_current_teams}
                          name="can_manage_current_teams"
                          label="Can manage current Groups?"
                          labelPlacement="end"
                          disabled={values.role === AccountType.SWIMMER_OR_PARENT || isInfoView}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Collapse in={addFields} timeout={500}>
                    <Grid container spacing={3}>
                      <Grid item lg={6} md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.phone && errors.phone)}
                          fullWidth
                          helperText={touched.phone && errors.phone}
                          label="Phone Number"
                          name="phone"
                          onBlur={handleBlur}
                          onChange={event => {
                            const { value } = event.target;
                            if (+value || !value) {
                              setFieldValue('phone', value);
                            }
                          }}
                          value={values.phone}
                          variant="outlined"
                          disabled={isInfoView}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.address_line1 && errors.address_line1)}
                          fullWidth
                          helperText={touched.address_line1 && errors.address_line1}
                          label="Address"
                          name="address_line1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address_line1}
                          variant="outlined"
                          disabled={isInfoView}
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
                          value={values.city}
                          variant="outlined"
                          disabled={isInfoView}
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
                          value={values.state}
                          variant="outlined"
                          disabled={isInfoView}
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
                          value={values.country}
                          variant="outlined"
                          disabled={isInfoView}
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
                          onChange={event => {
                            const { value } = event.target;
                            if (+value || !value) {
                              setFieldValue('zipcode', value);
                            }
                          }}
                          value={values.zipcode}
                          variant="outlined"
                          disabled={isInfoView}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
                <Box display="flex" justifyContent="center" width="100%">
                  {!addFields ? (
                    <TooltipComponent title="show more fields">
                      <IconButton color="secondary" onClick={handleFields} size="large">
                        <ExpandMoreIcon fontSize="large" />
                      </IconButton>
                    </TooltipComponent>
                  ) : (
                    <TooltipComponent title="hide">
                      <IconButton color="secondary" onClick={handleFields} size="large">
                        <ExpandLessIcon fontSize="large" />
                      </IconButton>
                    </TooltipComponent>
                  )}
                </Box>
              </Grid>
            </CardContent>
            <ResetPassword open={open} handleClose={handleClose} userId={member?._id} />
            {!isInfoView && (
              <>
                <Divider />
                <Box p={2} display="flex" justifyContent="flex-end">
                  <LoadingButton
                    color="secondary"
                    type="submit"
                    variant="contained"
                    isLoading={isLoading}
                    isValid={isValid}
                    progressSize={20}
                    startIcon={<SaveIcon />}
                    className={classes.saveBtn}
                  >
                    <Typography component="span" className={classes.buttonText}>
                      {type === 'create' ? 'Save & Invite' : 'Save'}
                    </Typography>
                  </LoadingButton>
                </Box>
                <ConfirmRoleChangeModal
                  open={confirmRoleChangeModal}
                  setOpen={setConfirmRoleChangeModal}
                  values={values}
                  formType={type}
                />
              </>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default Form;
