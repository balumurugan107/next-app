import React, { useState } from 'react';
import { Grid, Card } from '@mui/material';
import { Formik, Form } from 'formik';
import { PlayCircle, Send } from 'react-feather';
import { EventNote } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import StepperComponent from 'src/components/StepperComponent';
import {
  model,
  defaultInitialValues,
  validationSchema,
  InitialValues
} from 'src/views/management/Services/MainView/LiveLessons/FormModel';
import LessonInformation from 'src/views/management/Services/MainView/LiveLessons/LiveLessonEditor/LessonInformation';
import LessonAssign from 'src/views/management/Services/MainView/LiveLessons/LiveLessonEditor/LessonAssign';
import LessonDate from 'src/views/management/Services/MainView/LiveLessons/LiveLessonEditor/LessonDate';
import { ComponentProps } from 'src/types';
import { EditorType } from 'src/store/management/service';

interface LiveLessonEditorProps<T> {
  handleClose: () => void;
  initialValues: T | null;
  onEditorSubmit: (values: InitialValues) => void;
  type: EditorType;
}

const LiveLessonEditor: React.FC<ComponentProps & LiveLessonEditorProps<InitialValues>> = ({
  handleClose,
  initialValues,
  onEditorSubmit,
  type
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const settings = useSelector(state => state.account.settings);
  const schema = validationSchema[activeStep];
  const { formId } = model;
  const steps = [
    {
      title: 'Lesson Information',
      step: <LessonInformation />,
      icon: <PlayCircle />
    },
    {
      title: 'Schedule', //old: Date & Time
      step: <LessonDate type={type} />,
      icon: <EventNote />
    },
    {
      title: 'Assign',
      step: <LessonAssign />,
      icon: <Send />
    }
  ];
  let defaultValues = defaultInitialValues;
  if (!initialValues && settings.serviceMaxPrice) {
    const defaultCost = Math.floor((settings.serviceMaxPrice * 0.15) / 10) * 10;
    defaultValues = { ...defaultInitialValues, cost: defaultCost };
  }
  const isLastStep = activeStep === steps.length - 1;
  return (
    <Grid item xs={12} sm={12} md={12} xl={8}>
      <Card>
        <Formik<InitialValues>
          initialValues={initialValues || defaultValues}
          validateOnChange={false}
          // validateOnBlur={false}
          onSubmit={(values, { setTouched, setSubmitting }) => {
            try {
              if (isLastStep) {
                setSubmitting(true);
                onEditorSubmit(values);
              } else {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
                setTouched({});
                setSubmitting(false);
              }
            } catch (error:any) {
              console.error(error);
            }
          }}
          validationSchema={schema}
        >
          {({ handleReset }) => (
            <Form id={formId}>
              <StepperComponent
                handleClose={() => {
                  handleReset();
                  handleClose();
                  setActiveStep(0);
                }}
                steps={steps}
                handleBack={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
                handleReset={() => setActiveStep(0)}
                activeStep={activeStep}
              />
            </Form>
          )}
        </Formik>
      </Card>
    </Grid>
  );
};

export default LiveLessonEditor;
