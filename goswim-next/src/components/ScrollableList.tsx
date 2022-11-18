import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove, SortOver } from 'react-sortable-hoc';
import { getLessons } from 'src/store/management/goswim/lessons/actions';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { alpha, LinearProgress, Link } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ConfirmRemove from 'src/views/goswim/admin/Courses/ConfirmRemove';
import { IUpdateLessonPosReq, updateLessonPositionInCourse } from 'src/store/goswim/admin/course';

const useStyles = makeStyles(theme => ({
  sortableDiv: {
    padding: '24px',
    background: alpha(theme.palette.primary.main, 0.04)
  },
  sortableItemParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'grabbing',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  sortableItemParentCursor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'default',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  sortedItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'grabbing',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    marginBottom: '8px',
    animation: `$fadeBackground 3000ms ${theme.transitions.easing.easeInOut}`
  },
  '@keyframes fadeBackground': {
    from: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white
    },
    to: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black
    }
  },
  elementHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  headingText: { padding: '8px' },
  actionContainer: { minWidth: '56px' },
  editIcon: { marginRight: '4px', cursor: 'pointer' },
  deleteIcon: { cursor: 'pointer' },
  draggableItem: {
    zIndex: 99999
  }
}));

const SortableComponent = (props: { courseId: string; modalType: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { courseId, modalType } = props;
  const history = useHistory();
  const { adminResults } = useSelector(state => state.courseDetails.lessons);
  const { isLoading } = useSelector(state => state.courseDetails);
  const { isLessonRemovedFromCourse } = useSelector(state => state.adminLesson);
  const [lessonList, setLessonList] = useState<any>([]);
  const [updatedValue, setUpdatedValue] = useState<number>();
  const [openConfirmDelete, setConfirmDelete] = React.useState(false);

  const onSortEnd = (sort: SortOver) => {
    setUpdatedValue(sort.newIndex);
    const updateReq: IUpdateLessonPosReq = {
      position: sort.newIndex,
      lesson_id: lessonList[sort.oldIndex]._id,
      course_id: courseId
    };
    dispatch(updateLessonPositionInCourse(updateReq));
    const updatedList = arrayMove(lessonList, sort.oldIndex, sort.newIndex);
    setLessonList(updatedList);
  };

  useEffect(() => {
    if (adminResults && !isLoading) {
      let indexedResult = [];
      indexedResult = adminResults?.map((result: any, index: any) => ({
        ...result,
        key: index
      }));
      setLessonList(indexedResult);
    }
  }, [adminResults, isLoading]);

  useEffect(() => {
    dispatch(getLessons(true, false, undefined, undefined, courseId));
  }, [isLessonRemovedFromCourse]);

  const SortableItem = SortableElement(({ value }: any) => (
    <div
      className={
        value.key === lessonList[updatedValue!]?.key
          ? classes.sortedItem
          : modalType === 'View'
          ? classes.sortableItemParentCursor
          : classes.sortableItemParent
      }
    >
      <div className={classes.elementHeader}>
        {modalType === 'Edit' && <DragIcon />}
        <Typography variant="body1" tabIndex={0} className={classes.headingText}>
          {value?.name}
        </Typography>
      </div>
      {modalType === 'Edit' && (
        <div className={classes.actionContainer}>
          <EditIcon
            className={classes.editIcon}
            onClick={() => history.push({ pathname: `/app/admin/lessons/${value?._id}/edit` })}
          />
          <DeleteIcon className={classes.deleteIcon} onClick={() => setConfirmDelete(true)} />
        </div>
      )}
      <ConfirmRemove
        id={value._id}
        courseId={courseId}
        open={openConfirmDelete}
        close={() => setConfirmDelete(false)}
        setConfirmDelete={setConfirmDelete}
      />
    </div>
  ));

  const SortableList = SortableContainer(({ items }: any) => {
    return (
      <ul>
        {!isLoading && items.length ? (
          items?.map((value: any, index: number) => (
            <SortableItem
              key={`item-${value._id}`}
              index={index}
              value={value}
              disabled={modalType === 'View'}
            />
          ))
        ) : !isLoading && items.length === 0 ? (
          <div className={classes.sortableDiv}>
            No Lessons available!!{' '}
            {modalType === 'Edit' && (
              <Link component={RouterLink} to="/app/admin/lessons">
                Click here to add lessons to this course
              </Link>
            )}{' '}
          </div>
        ) : (
          isLoading && <LinearProgress />
        )}
      </ul>
    );
  });

  return <SortableList items={lessonList} onSortEnd={onSortEnd} distance={1} />;
};

export default SortableComponent;
