export enum MemberMessages {
  GET_FAILED = 'Unable to retrieve members',
  DELETE_SUCCESS = 'Selected Members Deleted',
  REMOVE_MEMBER_SUCCESS = 'Selected Members Removed',
  DELETE_FAILED = 'Member Deletion Failed',
  REMOVE_MEMBER_FAILED = 'Unable to remove member',
  SEND_INVITATION_SUCCESS = 'Invitation sent to selected Members',
  SEND_INVITATION_FAILED = 'Unable to send invitation to selected members',
  IMPORT_SUCCESS = 'Members imported',
  IMPORT_FAILED = 'Unable to import members',
  MEMBER_CREATED = 'Member Created',
  MEMBER_UPDATED = 'Member Updated',
  MEMBER_CREATION_FAILED = 'Unable to create Member',
  MEMBER_UPDATION_FAILED = 'Unable to update Member',
  INVALID_CSV_FORMAT = 'Imported csv file is not in a valid format. To get valid formatted file, please try exporting the Member List',
  COUPON_SUCCESS = 'Coupons have been sent to selected Members',
  COUPON_FAILED = 'Unable to send coupons to selected Members',
  OPERATION_CANCELLED = 'Operation cancelled due to new request',
  SETTINGS_UPDATE_FAILED = 'Unable to update settings'
}

export enum Role {
  CoachSwimmingExpert = 'Coach/Swimming Expert',
  SwimmerParent = 'Swimmer/Parent'
}
