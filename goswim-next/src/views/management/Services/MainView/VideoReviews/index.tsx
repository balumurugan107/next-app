import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Grid, Box, LinearProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import StackGrid from 'src/components/StackGrid';
import {
  ServiceType,
  getReviewServices,
  ReviewServiceDocument,
  ServiceEditorStatus,
  deleteReviewServices,
  ReviewServiceIds,
  ServiceTabs,
  createReviewServices,
  ReviewService,
  updateReviewServices
} from 'src/store/management/service';
import { ReviewSubCardComponent } from 'src/views/management/Services/MainView/VideoReviews/ReviewServiceCardComponent';
import { DialogContent } from 'src/views/calendar/MainView';
import FilterHeader from 'src/views/management/Services/MainView/FilterHeader';
import Dialog from 'src/components/DialogAlert';
import VideoReviewEditor, {
  EditorData
} from 'src/views/management/Services/MainView/VideoReviews/VideoReviewEditor';
import applyFilters from 'src/views/management/Services/MainView/ApplyFilters';
import { AccountType, DialogType, ToggleButton } from 'src/constants';
import { ComponentProps } from 'src/types';

import 'react-daterange-picker/dist/css/react-calendar.css';

interface CardFormat {
  name: 'VIDEO REVIEWS' | 'PRIVATE LESSONS' | 'SETS';
  value: ServiceType;
  icon: React.FC;
}

const useStyles = makeStyles(theme => ({
  root: {
    '@global': {
      '.MuiSvgIcon-colorSecondary': {
        color: theme.palette.secondary.main
      }
    }
  },
  progressBox: {
    height: 10,
    width: '100% !important',
    [theme.breakpoints.down('sm')]: { width: '100% !important', float: 'right' }
  }
}));

const cards: CardFormat[] = [
  {
    name: 'VIDEO REVIEWS',
    value: 'videoReviews',
    icon: VideoLibraryOutlinedIcon
  }
];

interface ScheduleComponentProps {
  currenttab?: ServiceTabs;
}

const Schedule: React.FC<ComponentProps & ScheduleComponentProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory<ReviewServiceDocument | null>();

  const { searchQuery } = useSelector(state => state.service);
  const { reviewServiceData, isLoading, isTeamLoading, teamData } = useSelector(state => {
    return {
      reviewServiceData: state.service.reviewData,
      isLoading: state.service.isLoading,
      isTeamLoading: state.team.isLoading,
      teamData: state.team.heirarchyTeams
    };
  });

  const uniqueTeams = useMemo(
    () => teamData?.filter(team => team?.rosterGroup?.length !== 0) || null,
    [teamData]
  ).sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

  const [isCompleted, setCompleted] = useState<boolean>(false);
  const setTeam = useState<string>(uniqueTeams[0]?._id || '')[1];
  const [rosterGroup, setRosterGroup] = useState<string[]>(uniqueTeams[0]?.rosterGroup || []);

  const setSelectedRosterGroup = useState<string[]>(uniqueTeams[0]?.rosterGroup || [])[1];

  const [vsEditorStatus, setVsEditorStatus] = useState<ServiceEditorStatus>({ active: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reviewIds, setReviewIds] = useState<ReviewServiceIds[] | null>(null);
  const [isInformationDialogOpen, setIsInformationDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

  const [formikValues, setFormikValues] = useState<EditorData | null>(null);

  const handleVsEditorStatus = (
    statusDetails: ServiceEditorStatus,
    data?: ReviewServiceDocument
  ) => {
    setVsEditorStatus({
      ...statusDetails
    });
    if (data) {
      setFormikValues({
        vrName: data.service,
        vrDescription: data.description,
        cost: Math.round(data.cost),
        slots: data.slots,
        startDate: moment(data.startDate),
        endDate: moment(data.endDate),
        vrTeam: data.teamId ? data.teamId : '',
        vrRoster: data.rosterGroup ? data.rosterGroup : [],
        serviceId: data.serviceId ? data.serviceId : '',
        serviceReviewId: data.serviceReviewId ? data.serviceReviewId : ''
      });
    }
  };

  const handleChangeRosterGroup = (rosters: string[]) => {
    setRosterGroup(rosters);
  };

  const handleChangeSelectedRosterGroup = (rosters: string[]) => {
    setSelectedRosterGroup(rosters);
  };

  const handleChangeTeam = (teamId: string) => {
    setTeam(teamId);
    const filterTeam = uniqueTeams.find(team => teamId.includes(team._id));
    handleChangeRosterGroup(filterTeam?.rosterGroup || []);
  };

  const handleDialogContent = (dialogcontent: DialogContent) => {
    setDialogContent(dialogcontent);
    setIsInformationDialogOpen(true);
  };

  const handleDelete = (ids: ReviewServiceIds[], dialogcontent: DialogContent) => {
    setReviewIds(ids);
    setDialogContent(dialogcontent);
    setIsModalOpen(true);
  };

  const selectedTeam = useSelector(state => state.members.currentSelectedTeam);

  const teamSelected = teamData.find(datum => datum._id === selectedTeam)?._id
  
  const userType = useSelector(state => state?.account?.user?.role);
  const handleVREditorSubmit = async ({
    vrName,
    vrDescription,
    startDate,
    endDate,
    vrTeam,
    vrRoster,
    ...rest
  }: EditorData) => {
    const mappedData: ReviewService[] = [
      {
        service: vrName,
        description: vrDescription,
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
        teamId: (userType === AccountType.COACH) ? teamSelected : vrTeam, //selected team for coach
        rosterGroup: [],
        ...rest
      }
    ];
    
    switch (vsEditorStatus.editorType) {
      case 'new':
        await dispatch(createReviewServices(mappedData));
        break;

      case 'edit': {
        const reviewDocument: ReviewServiceDocument[] = [
          {
            ...mappedData[0],
            serviceId: rest.serviceId || '',
            serviceReviewId: rest.serviceReviewId || ''
          }
        ];
        await dispatch(updateReviewServices(reviewDocument));
        break;
      }

      case 'clone':
        await dispatch(createReviewServices(mappedData));
        break;

      default:
        break;
    }
    handleVsEditorStatus({ active: false });
    handleGetReviewServices();
  };

  const filteredVideoReviewServices =
    reviewServiceData &&
    applyFilters(reviewServiceData, searchQuery, [
      'service',
      'description',
      'rosterGroup',
      'teamName'
    ]);

  const handleGetReviewServices = () => {
    dispatch(getReviewServices(isCompleted ? ToggleButton.COMPLETED : ToggleButton.UPCOMING));
  };

  useEffect(() => {
    handleGetReviewServices();
  }, [isCompleted, dispatch]); // eslint-disable-line

  useEffect(() => {
    const data = history.location.state;
    if (data?.teamId) {
      handleVsEditorStatus(
        {
          active: true,
          serviceType: 'videoReviews',
          editorType: 'edit'
        },
        data
      );
      handleChangeTeam(data.teamId[0]);
      if (!isTeamLoading) {
        const filterTeam = uniqueTeams.find(
          team => data && data.teamId && data.teamId.includes(team._id)
        );
        handleChangeSelectedRosterGroup(
          filterTeam?.rosterGroup?.filter(datum => data.rosterGroup?.includes(datum)) || []
        );
        history.replace({
          state: null
        });
      }
    }
  }, [uniqueTeams, isTeamLoading]);

  const CardComponent: React.FC<{
    card: CardFormat;
    data: ReviewServiceDocument[] | null;
    classes: Record<any, string>;
  }> = useCallback(
    cardProps => (
      <>
        <StackGrid>
          {cardProps.data?.map(datum => (
            <ReviewSubCardComponent
              key={`${datum.serviceId}-${datum.serviceReviewId}`}
              data={datum}
              servicetype={cardProps.card.value}
              handleVsEditorStatus={handleVsEditorStatus}
              handleChangeTeam={handleChangeTeam}
              handleChangeSelectedRosterGroup={handleChangeSelectedRosterGroup}
              handleDelete={handleDelete}
              dialogContent={handleDialogContent}
            />
          ))}
        </StackGrid>
      </>
    ),
    [classes, rosterGroup]
  );

  const handleAddVideoReview = () => {
    handleVsEditorStatus({
      active: true,
      editorType: 'new'
    });
    setFormikValues(null);
  };

  return (
    <>
      {!vsEditorStatus.active && (
        <FilterHeader
          iscompleted={isCompleted}
          isSet={false}
          isLesson={false}
          handleAddNew={handleAddVideoReview}
          handleCompletedSwitch={setCompleted}
          searchPlaceholder="Search Video Reviews" //video reviews main view
        />
      )}
      <Grid className={clsx(classes.root, className)} container {...rest}>
        {vsEditorStatus.active ? (
          <VideoReviewEditor
            handleEditorClose={() => {
              handleVsEditorStatus({ active: false });
              setFormikValues(null);
            }}
            onEditorSubmit={handleVREditorSubmit}
            data={formikValues}
          />
        ) : isLoading ? (
          <Box className={classes.progressBox}>
            <LinearProgress />
          </Box>
        ) : (
          (filteredVideoReviewServices?.length && (
            <>
              {cards.map((card: CardFormat) => (
                <CardComponent
                  key={card.name}
                  data={filteredVideoReviewServices}
                  {...{
                    card
                  }}
                  classes={classes}
                />
              ))}
            </>
          )) ||
          (!isLoading && (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {isCompleted ? (
                  <Typography>No Completed Video Reviews found</Typography>
                ) : (
                  <Typography>No Upcoming Video Reviews found</Typography>
                )}
              </Box>
            </Grid>
          ))
        )}
        {isModalOpen && dialogContent && reviewIds && (
          <Dialog<ReviewServiceIds[]>
            type={DialogType.CONFIRMATION}
            title={dialogContent.title}
            values={reviewIds}
            open={isModalOpen}
            handleCloseDialog={() => setIsModalOpen(false)}
            handleYes={ids => {
              dispatch(deleteReviewServices(ids));
              setIsModalOpen(false);
              setDialogContent(null);
              setReviewIds(null);
              setCompleted(false);
            }}
            handleNo={() => {
              setIsModalOpen(false);
              setReviewIds(null);
              setDialogContent(null);
            }}
          >
            <Typography>{dialogContent.description}</Typography>
          </Dialog>
        )}
        {isInformationDialogOpen && dialogContent && (
          <Dialog
            type={DialogType.INFORMATION}
            open={isInformationDialogOpen}
            title={dialogContent.title}
            handleCloseDialog={() => {
              setIsInformationDialogOpen(false);
              setDialogContent(null);
            }}
            handleCloseInformation={() => {
              setIsInformationDialogOpen(false);
              setDialogContent(null);
            }}
          >
            <Typography>{dialogContent.description}</Typography>
          </Dialog>
        )}
      </Grid>
    </>
  );
};

export default Schedule;
