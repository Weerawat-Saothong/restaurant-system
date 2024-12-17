import { AxiosRequestConfig } from "axios";
import axiosAdapter from "../adapters/axios.adapter";

import { Response } from "./types/response.type";

import { ApiPath } from "./types/api-path.type";
import { requestConfig } from "./types/request.config";
import { GuardRes } from "./types/guard.type";
export interface GuardRepository {
    getOne(id: string): Promise<Response<GuardRes>>;

  }
  export class GuardRepositoryImpl implements GuardRepository {
    get headers(): AxiosRequestConfig {
      return requestConfig();
    }
  
    async getOne(id: string) {
      const path = ApiPath.GetTableFoodByID.replace("{id}", id);
  
      const res = await axiosAdapter.get<Response<GuardRes>>(
        `${path}`,
        // this.headers
      );
  
      return res.data;
    }

  
  }