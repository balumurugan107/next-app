import { SwimmerTag } from 'src/views/management/Services/MainView/Set/SetWriterEditor/types';

export default class SwimmerTagMetadata {
  appliedLines: number[] = [];
  constructor(public lineNumber: number, public tagText: string, public tagData: SwimmerTag[]) {}
}
