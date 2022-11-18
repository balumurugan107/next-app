import { SpecialGroupsActionType, specialGroupsState } from './types';

const initialState: specialGroupsState = {
  isLoading: false,
  error: null,
  groups: [
    {
      email: 'alabama@gmail.com',
      payment_status: 'completed',
      total_amount: 120,
      total_coaches: 10,
      total_members: 40,
      group_name: 'Alabama',
      group_status: 'active',
      plan_duration: 1665722591009
    }
  ],
  totalCount: 1
};

export const specialGroupsReducer = (state = initialState, action: SpecialGroupsActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};
