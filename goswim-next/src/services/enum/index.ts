import { httpClientInstance } from 'src/core/HttpClient';

import { HTTPResponse } from 'src/types';
import { EnumResponseDocument, Enum } from 'src/store/enum/types';

export default class EnumService {
  private static instance: EnumService;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new EnumService();
    return this.instance;
  }

  createOrUpdateEnum = async (workout: Enum) => {
    try {
      const response = await httpClientInstance.post<HTTPResponse<EnumResponseDocument>>(
        'api/v1/enum',
        workout
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getEnum = async () => {
    try {
      const response = await httpClientInstance.get<HTTPResponse<EnumResponseDocument>>(
        'api/v1/enum'
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  deleteEnum = async (enumId: string) => {
    try {
      const response = await httpClientInstance.delete<HTTPResponse<EnumResponseDocument>>(
        `api/v1/enum/${enumId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export const enumService = EnumService.getInstance();
