export default {
  formId: 'liveLesson',
  formField: {
    lessonName: {
      name: 'name',
      label: 'Lesson Name',
      required: 'Lesson Name is required'
    },
    lessonDescription: {
      name: 'description',
      label: 'Description',
      required: 'Description is requried'
    },

    price: {
      name: 'cost',
      label: 'Price',
      defaultValue: 30,
      minValue: 0,
      maxValue: 200,
      step: 10
    },
    lessonDate: {
      name: 'lessonDate'
    },

    liveSchedule: {
      name: 'liveSchedule'
    },
    liveScheduleCost: {
      name: 'cost',
      label: 'Price',
      defaultValue: 50,
      minValue: 0,
      maxValue: 200
    },

    liveScheduleSelected: {
      name: 'selected'
    },

    slots: {
      name: 'slots',
      minLength: 1,
      maxLength: 10
    },
    startTime: {
      name: 'startTime',
      label: 'Start Time'
    },
    endTime: {
      name: 'endTime',
      label: 'End Time'
    },
    team: {
      name: 'team',
      label: 'Team',
      required: 'Team is required'
    },
    roster: {
      name: 'roster',
      label: 'Select Roster Group',
      required: 'Roster Group is requried'
    },
    removedSlots: {
      name: 'removedSlots'
    }
  }
};
