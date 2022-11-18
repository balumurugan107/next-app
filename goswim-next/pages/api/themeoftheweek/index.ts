import { Dispatch } from 'redux';
import { dashboardServiceInstance } from "src/services/dashboard/dashboardService";
import { GetDashboardWeeklyThemesFailure, GetDashboardWeeklyThemesRequest, GetDashboardWeeklyThemesSuccess, GET_DASHBOARD_WEEKLY_THEMES_FAILURE, GET_DASHBOARD_WEEKLY_THEMES_REQUEST, GET_DASHBOARD_WEEKLY_THEMES_SUCCESS } from "src/store/newdashboard";



export const apiGetThemeOfTheWeek = async (dispatch: Dispatch, scheduled_on: number, timeZone?: string) => {
  try {
    //const payload = await authServiceInstance.loginWithToken({ ...user });

    dispatch<GetDashboardWeeklyThemesRequest>({ type: GET_DASHBOARD_WEEKLY_THEMES_REQUEST });
    const response = await dashboardServiceInstance.getDashboardWeeklyThemes(scheduled_on, timeZone);
    dispatch<GetDashboardWeeklyThemesSuccess>({
      type: GET_DASHBOARD_WEEKLY_THEMES_SUCCESS,
      payload: response
    });
  } catch (error: any) {
    dispatch<GetDashboardWeeklyThemesFailure>({
      type: GET_DASHBOARD_WEEKLY_THEMES_FAILURE,
      error
    });
  }
}