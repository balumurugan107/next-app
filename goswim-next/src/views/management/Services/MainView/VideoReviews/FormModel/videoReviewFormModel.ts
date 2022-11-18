export interface VRFormAttributesBasic {
  name: VRFormKeys;
  label: string;
  required?: string;
}

export interface VRFormAttributesSlider extends VRFormAttributesBasic {
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
}

export interface VRFormField {
  vrName: VRFormAttributesBasic;
  vrDescription: VRFormAttributesBasic;
  cost: VRFormAttributesSlider;
  slots: VRFormAttributesSlider;
  startDate: VRFormAttributesBasic;
  endDate: VRFormAttributesBasic;
  vrTeam: VRFormAttributesBasic;
  vrRoster: VRFormAttributesBasic;
}

export interface VRFormModel {
  formId: string;
  formField: VRFormField;
}

export type VRFormKeys = keyof VRFormField;

const vrFormModel: VRFormModel = {
  formId: 'videoReview',
  formField: {
    vrName: {
      name: 'vrName',
      label: 'Video Review Name',
      required: 'Video Review Name is required'
    },
    vrDescription: {
      name: 'vrDescription',
      label: 'Description',
      required: 'Description is Requried'
    },
    cost: {
      name: 'cost',
      label: 'Cost',
      defaultValue: 30,
      minValue: 0,
      maxValue: 200,
      step: 10
    },
    slots: {
      name: 'slots',
      label: 'Slots',
      defaultValue: 30,
      minValue: 1,
      maxValue: 100,
      step: 10
    },
    startDate: {
      name: 'startDate',
      label: 'Video Review Start Date'
    },
    endDate: {
      name: 'endDate',
      label: 'Video Review End Date'
    },
    vrTeam: {
      name: 'vrTeam',
      label: 'Team',
      required: 'Team is Requried'
    },
    vrRoster: {
      name: 'vrRoster',
      label: 'Select Roster Group',
      required: 'Roster Group is requried'
    }
  }
};

export default vrFormModel;
