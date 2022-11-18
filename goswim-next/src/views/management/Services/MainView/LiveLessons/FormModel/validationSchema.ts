import * as Yup from 'yup';
import liveLessonModel from 'src/views/management/Services/MainView/LiveLessons/FormModel/livelessonFormModel';
import moment, { Moment } from 'moment';

const {
  formField: {
    lessonName: name,
    lessonDescription: description,
    slots,
    startTime,
    endTime,
    team,
    roster,
    lessonDate
  }
} = liveLessonModel;

export default [
  Yup.object().shape({
    [name.name]: Yup.string()
      .nullable()
      .required(name.required),
    [description.name]: Yup.string().required(description.required)
  }),
  Yup.object().shape({
    [lessonDate.name]: Yup.mixed<Moment>().test(lessonDate.name, 'Invalid Date', function(
      value: Moment
    ) {
      return (
        value.valueOf() >=
        moment()
          .startOf('day')
          .valueOf()
      );
    }),
    [slots.name]: Yup.array()
      .of(
        Yup.object().shape({
          [startTime.name]: Yup.mixed<Moment>().test(
            startTime.name,
            'Start Time should be smaller than End Time',
            function(value: Moment) {
              return this.parent[endTime.name] > value.valueOf();
            }
          ),
          [endTime.name]: Yup.mixed<Moment>().test(
            endTime.name,
            'End time should be greater then startTime',
            function(value: Moment) {
              return value.valueOf() > this.parent[startTime.name].valueOf();
            }
          )
        })
      )
      .min(1)
      .max(10)
  }),
  Yup.object().shape({
    [team.name]: Yup.string().required(team.required),
    [roster.name]: Yup.array<string>().min(1, roster.required)
  })
];
