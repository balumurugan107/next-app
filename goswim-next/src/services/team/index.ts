import { httpClientInstance } from 'src/core/HttpClient';
import {
  UpdateTeamData,
  TeamDocument,
  // TeamHeirarchyDocument,
  DeleteTeamData,
  RemoveTeamData,
  memberList,
  getMemberArgs
} from 'src/store/management/team';
import { HTTPResponse } from 'src/types';
import SnackbarUtils from 'src/helpers/snackbar';
import { defaultOptions, defaultErrorMessage } from 'src/constants';

export interface DecodedJwt {
  exp: number;
}

export default class TeamService {
  private static instance: TeamService;

  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TeamService();
    return this.instance;
  }

  createTeam = async (values: UpdateTeamData) => {
    try {
      const fd = new FormData();
      fd.append('name', values.name || '');
      fd.append('city', values.city || '');
      fd.append('zipcode', values.zipcode || '');
      fd.append('country', values.country || '');
      fd.append('state', values.state || '');
      if (values.brand_logo?.length > 0) {
        fd.append('s3_brand_logo', `${values.img_uploaded_timestamp}/${values.brand_logo}`);
      } else if (values.brand_logo?.length === 0) {
        fd.append('s3_brand_logo', '');
      }
      fd.append('brand_theme', values.brand_theme || '');
      fd.append('description', values.description || '');

      const response = await httpClientInstance.post<HTTPResponse<TeamDocument>>(
        '/api/v1/team/',
        fd
      );

      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  updateTeam = async (values: UpdateTeamData, teamId: string) => {
    try {
      const fd = new FormData();
      fd.append('name', values.name || '');
      fd.append('city', values.city || '');
      fd.append('zipcode', values.zipcode || '');
      fd.append('country', values.country || '');
      fd.append('state', values.state || '');
      if (values.brand_logo?.length > 0) {
        fd.append('s3_brand_logo', `${values.img_uploaded_timestamp}/${values.brand_logo}`);
      } else if (values.brand_logo?.length === 0) {
        fd.append('s3_brand_logo', '');
      }
      fd.append('brand_theme', values.brand_theme || '');
      fd.append('description', values.description || '');
      const response = await httpClientInstance.put<HTTPResponse<TeamDocument>>(
        `/api/v1/team/edit/${teamId}`,
        fd
      );

      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getTeam = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<TeamDocument[]>>('/api/v1/team');
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getTeamHeirarchy = async (args?: getMemberArgs) => {
    let page = '';
    let limit = '';
    let search = '';
    if (args?.page) page = `?page=${args.page}`;
    if (args?.limit) limit = `&limit=${args.limit}`;
    if (args?.search) search = `&search=${args.search}`;

    try {
      const response = await httpClientInstance.get<HTTPResponse<memberList>>(
        `/api/v1/member/groups${page}${limit}${search}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getMemberGroups = async (args?: any) => {
    let page = '';
    let limit = '';
    let search = '';
    if (args?.page) page = `?page=${args.page}`;
    if (args?.limit) limit = `&limit=${args.limit}`;
    if (args?.search) search = `&search=${args.search}`;

    try {
      const response = await httpClientInstance.get<HTTPResponse<memberList>>(
        `/api/v1/member/groups/nodefault${page}${limit}${search}`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  getTeamsList = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<memberList>>(
        `/api/v1/member/groups`
      );
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  deleteTeams = async (teamId: DeleteTeamData) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse<DeleteTeamData>>(
        `api/v1/team/`,
        teamId
      );

      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };

  exitFromTeam = async (teamId: RemoveTeamData) => {
    try {
      const response = await httpClientInstance.put<HTTPResponse<DeleteTeamData>>(
        `api/v1/member/exit/team`,
        teamId
      );

      SnackbarUtils.success(response.data.message, defaultOptions);
      return response.data;
    } catch (error) {
      SnackbarUtils.error(error.response?.data?.message || defaultErrorMessage, defaultOptions);
      throw error;
    }
  };
}

export const teamServiceInstance = TeamService.getInstance();
