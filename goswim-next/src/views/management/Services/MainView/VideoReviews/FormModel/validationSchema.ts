import * as Yup from 'yup';
import videoReviewModel from 'src/views/management/Services/MainView/VideoReviews/FormModel/videoReviewFormModel';
import moment, { Moment } from 'moment';

const {
  formField: {
    vrName: reviewName,
    vrDescription: reviewDescription,
    startDate,
    endDate,
    vrTeam,
    vrRoster
  }
} = videoReviewModel;

export default [
  Yup.object().shape({
    [reviewName.name]: Yup.string()
      .nullable()
      .required(reviewName.required),
    [reviewDescription.name]: Yup.string().required(reviewDescription.required)
  }),
  Yup.object().shape({
    [startDate.name]: Yup.mixed<Moment>().test(
      startDate.name,
      'Invalid Start Date',
      (value: Moment) => {
        return (
          value.valueOf() >
          moment()
            .subtract(1, 'days')
            .endOf('day')
            .valueOf()
        );
      }
    ),
    [endDate.name]: Yup.mixed<Moment>().test(endDate.name, 'Invalid End Date', (value: Moment) => {
      return (
        value.valueOf() >
        moment()
          .startOf('day')
          .valueOf()
      );
    })
  }),
  Yup.object().shape({
    [vrTeam.name]: Yup.string().required(vrTeam.required),
    [vrRoster.name]: Yup.array<string>().min(1, vrRoster.required)
  })
];
