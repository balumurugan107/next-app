import React, { FC, useState } from 'react';
import { Grid, Card } from '@mui/material';
import { PlayCircle, Send } from 'react-feather';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import StepperComponent from 'src/components/StepperComponent';
import ReviewAssign from 'src/views/management/Services/MainView/VideoReviews/VideoReviewEditor/ReviewAssign';
import ReviewInformation from 'src/views/management/Services/MainView/VideoReviews/VideoReviewEditor/ReviewInformation';
import {
  model,
  intialValues,
  validationSchema,
  EditorData
} from 'src/views/management/Services/MainView/VideoReviews/FormModel';

export interface VideoReviewEditorDataProps {
  handleEditorClose: () => void;
  onEditorSubmit: (videoReview: EditorData) => void;
  data: EditorData | null;
}

const VideoReviewEditor: FC<VideoReviewEditorDataProps> = ({
  data,
  handleEditorClose,
  onEditorSubmit,
  ...rest
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const schema = validationSchema[activeStep];
  const { formId } = model;
  const settings = useSelector(state => state.account.settings);

  const steps = [
    {
      title: 'Review Information',
      step: <ReviewInformation />,
      icon: <PlayCircle />
    },
    {
      title: 'Assign',
      step: <ReviewAssign />,
      icon: <Send />
    }
  ];
  let defaultValues = intialValues;
  if(!data && settings.serviceMaxPrice) {
    const defaultCost = Math.floor((settings.serviceMaxPrice* 0.15)/10)* 10;
    defaultValues = {...intialValues, cost: defaultCost}
  }
  const isLastStep = activeStep === steps.length - 1;
  return (
    <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
      <Card>
        <Formik
          initialValues={data || defaultValues}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setTouched, setSubmitting }) => {
            if (isLastStep) {
              setSubmitting(true);
              onEditorSubmit(values);
            } else {
              setActiveStep(prevActiveStep => prevActiveStep + 1);
              setTouched({});
              setSubmitting(false);
            }
          }}
          validationSchema={schema}
        >
          {({ handleReset }) => (
            <Form id={formId}>
              <StepperComponent
                steps={steps}
                handleBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
                handleReset={() => setActiveStep(0)}
                activeStep={activeStep}
                handleClose={() => {
                  handleReset();
                  setActiveStep(0);
                  handleEditorClose();
                }}
                {...rest}
              />
            </Form>
          )}
        </Formik>
      </Card>
    </Grid>
  );
};

export * from 'src/views/management/Services/MainView/VideoReviews/FormModel';

export default VideoReviewEditor;
