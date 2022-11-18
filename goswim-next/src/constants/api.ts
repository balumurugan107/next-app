export interface getLessonArgs {
  isAdmin: boolean;
  isBasic: boolean;
  pageID?: number | string;
  limit?: number;
  course_id?: any;
  stroke?: any;
  expertise?: any;
  tags?: any;
  search?: any;
  state?: number | string;
}
