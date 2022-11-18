// export const getSpecialGroups = (args: specialGroupsArgs) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             dispatch<GetSpecialGroupServiceRequest>({ type: GET_SPECIAL_GROUPS_REQUEST });
//             const response = await SpecialGroupServiceInstance.getStatistics(args);
//             dispatch<GetSpecialGroupServiceSuccess>({
//                 type: GET_SPECIAL_GROUPS_SUCCESS,
//                 payload: response.data
//             });
//         } catch (error:any) {
//             dispatch<GetSpecialGroupServiceFailure>({ type: GET_SPECIAL_GROUPS_FAILURE });
//         }
//     };
// };

// export const removeAllStatisticState = () => {
//     return async (dispatch: Dispatch) => {
//         try {
//             dispatch<RemoveAllStatisticState>({ type: REMOVE_STATISTIC_STATE });
//         } catch (error:any) { }
//     };
// };
