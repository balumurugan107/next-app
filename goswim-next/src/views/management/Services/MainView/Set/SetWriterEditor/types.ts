import { MutableRefObject } from 'react';
import { UnControlled as UnControlledCodeMirror } from 'react-codemirror2';
import MultiplierMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/MultiplierMetadata';
import SwimmerTagMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/SwimmerTagMetadata';
import GroupMetadata from 'src/views/management/Services/MainView/Set/SetWriterEditor/GroupMetadata';

export interface SWEditorProps extends Partial<SWEditorPropsCallback> {
  query?: string;
  workoutEnums?: SWEWorkoutEnums;
  swimmers?: SwimmerTag[];
  editorInstance?: MutableRefObject<null | CodeMirror.Editor>;
  renderSyntax?: (currentActiveParseTrace: TraceItem[]) => JSX.Element | null;
  readOnly?: boolean;
  suggestionsContainer?: MutableRefObject<HTMLDivElement | null>;
}

export interface SWEditorPropsCallback {
  /** Callback when a change occurs - if onErrorStatusChange is false then the set data is valid */
  onValueChange: (value: TraceItem[]) => void;
  /** on Multiplier SwimmerTag GroupName Value Change */
  onMSGValueChange: (value: null | MSGPropertyValue[]) => void;
  onErrorStatusChange: (status: boolean) => void;
  onLineChange?: (line: number) => void;
  onQueryChange?: (query: string) => void;
}

export interface SwimmerTag {
  id: string;
  name: string;
}

/** CodeMirror Ref UnControlled */
export interface CodeMirrorRefUC extends UnControlledCodeMirror {
  editor: CodeMirror.Editor;
}

export interface Set {
  multiplier: number;
  distance: number;
  time: number;
  setProps: SetProps[];
  setText: string;
  swimmers?: SwimmerTag[];
  groupName?: string;
}

export interface SetPropsValues {
  iteration: number;
  interval: number;
  value: number;
}

export interface SetProps extends SetPropsValues {
  stroke: SetPropsEnumProperty;
  type: SetPropsEnumProperty;
  intensity: SetPropsEnumProperty;
  equipment: SetPropsEnumProperty;
}

export interface SetPropsEnumProperty {
  id: string;
  name: string;
}

export type TraceHistory = Map<number, TraceItem>;

export type MultiplierMetadataHistory = Map<number, MultiplierMetadata>;

export type SwimmerTagMetadataHistory = Map<string, SwimmerTagMetadata>;

export type GroupMetadataHistory = Map<number, GroupMetadata>;

export interface TraceItem extends Set {
  isError: boolean;
  line: number;
}

export interface SWEWorkoutEnumProps {
  id: string;
  name: string;
  shortForm: string;
}

export interface SWEWorkoutEnumCourseProps {
  id: string;
  poolSize: string;
  metric: string;
}

export interface SWEWorkoutEnums {
  intensities: SWEWorkoutEnumProps[];
  strokes: SWEWorkoutEnumProps[];
  swimTypes: SWEWorkoutEnumProps[];
  equipment: SWEWorkoutEnumProps[];
  courses?: SWEWorkoutEnumCourseProps[];
}

export interface SWEWorkoutEnumsDefaultValues {
  stroke: SetPropsEnumProperty;
  swimType: SetPropsEnumProperty;
  intensity?: SetPropsEnumProperty;
  equipment?: SetPropsEnumProperty;
  course?: SetPropsEnumProperty;
}

export interface SuggestionProp {
  suggestionText?: string;
  onSwimmerTagSelected?: (uuid: string, guidtagText: string, tagData: SwimmerTag[]) => void;
}

/** Multiplier SwimmerTag GroupName Set Value */
export interface MSGSetValue {
  id: string;
  name: string;
  value: number;
  interval: number;
}

/** Multiplier SwimmerTag GroupName Property Value */
export interface MSGPropertyValue {
  distance: number;
  time: number;
  line: number;
  stroke: MSGSetValue[];
  type: MSGSetValue[];
  intensity: MSGSetValue[];
  equipment: MSGSetValue[];
}

/** Multiplier SwimmerTag GroupName Property Map */
export type MSGPropertyMap = Map<number, MSGPropertyValue>;

export type ParseQueryCurrentActiveMultiplierTracker = {
  value?: number;
  line?: number | null;
};

export type ParseQueryCurrentActiveSwimmerTagTracker = {
  uuid: string | null;
  metadata: SwimmerTagMetadata | null;
};

export type ParseQueryCurrentActiveGroupTracker = {
  groupName?: string | null;
  line?: number | null;
};

export type LastKeyDown = Pick<KeyboardEvent, 'keyCode' | 'ctrlKey' | 'altKey' | 'shiftKey'>;
