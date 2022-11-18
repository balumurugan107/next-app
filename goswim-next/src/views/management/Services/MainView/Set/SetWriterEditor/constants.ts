import {
  SWEWorkoutEnumProps,
  SWEWorkoutEnumCourseProps,
  SWEWorkoutEnums
} from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

export const intensities: SWEWorkoutEnumProps[] = [
  {
    id: 'easy-id',
    name: 'easy',
    shortForm: 'ez'
  },
  {
    id: 'moderate',
    name: 'moderate',
    shortForm: 'mod'
  },
  {
    id: 'build',
    name: 'build',
    shortForm: 'bld'
  },
  {
    id: 'fast',
    name: 'fast',
    shortForm: 'mod'
  },
  {
    id: 'sprint',
    name: 'sprint',
    shortForm: 'spr'
  }
];

export const strokes: SWEWorkoutEnumProps[] = [
  {
    id: 'back',
    name: 'back',
    shortForm: 'bk'
  },
  {
    id: 'free',
    name: 'free',
    shortForm: 'fr'
  },
  {
    id: 'fly',
    name: 'fly',
    shortForm: 'fl'
  },
  {
    id: 'breast',
    name: 'breast',
    shortForm: 'br'
  },
  {
    id: 'im',
    name: 'im',
    shortForm: 'im'
  },
  {
    id: 'mix',
    name: 'mix',
    shortForm: 'mx'
  },
  {
    id: 'stroke',
    name: 'stroke',
    shortForm: 'str'
  },
  {
    id: 'choice',
    name: 'choice',
    shortForm: 'ch'
  },
  {
    id: 'worst',
    name: 'worst',
    shortForm: 'wrst'
  },
  {
    id: 'free-im',
    name: 'free-im',
    shortForm: 'frim'
  }
];

export const swimTypes: SWEWorkoutEnumProps[] = [
  {
    id: 'swim',
    name: 'swim',
    shortForm: 's'
  },
  {
    id: 'kick',
    name: 'kick',
    shortForm: 'k'
  },
  {
    id: 'pull',
    name: 'pull',
    shortForm: 'p'
  },
  {
    id: 'mix',
    name: 'mix',
    shortForm: 'mx'
  },
  {
    id: 'drill',
    name: 'drill',
    shortForm: 'dr'
  }
];

export const equipment: SWEWorkoutEnumProps[] = [
  {
    id: 'kickboard',
    name: 'kickboard',
    shortForm: 'board'
  },
  {
    id: 'paddles',
    name: 'paddles',
    shortForm: 'paddle'
  },
  {
    id: 'fins',
    name: 'fins',
    shortForm: 'fin'
  },
  {
    id: 'snorkels',
    name: 'snorkels',
    shortForm: 'snorkel'
  },
  {
    id: 'sneakers',
    name: 'sneakers',
    shortForm: 'shoes'
  },
  {
    id: 'tshirts',
    name: 'tshirts',
    shortForm: 'shirts'
  },
  {
    id: 'tubes',
    name: 'tubes',
    shortForm: 'tube'
  },
  {
    id: 'buoys',
    name: 'buoys',
    shortForm: 'buoy'
  },
  {
    id: 'buckets',
    name: 'buckets',
    shortForm: 'bucket'
  }
];

export const courses: SWEWorkoutEnumCourseProps[] = [
  {
    id: '25-meters',
    poolSize: '25',
    metric: 'meters'
  },
  {
    id: '25-yards',
    poolSize: '25',
    metric: 'yards'
  },
  {
    id: '25-meters',
    poolSize: '50',
    metric: 'meters'
  }
];

export const defaultSWEWorkoutEnums: SWEWorkoutEnums = {
  intensities,
  strokes,
  swimTypes,
  equipment,
  courses
};
