import axiosAdapterUms from "../adapters/axios-ums.adapter";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../adapters/cookies.adapter";

import { LoginIF } from "@/app/[locale]/login/interface";
import axiosAdapter from "@/adapters/axios.adapter";
import { AxiosRequestConfig } from "axios";
import { requestConfig } from "./types/request.config";
import ApiiPath from "../adapters/axios-ums.adapter";
import { ApiPath } from "./types/api-path.type";


export interface AuthRepository {
  login(req:LoginIF): Promise<any>;
  
}

export class AuthRepositoryImpl implements AuthRepository {
  get headers(): AxiosRequestConfig {
    return requestConfig();
  }

  constructor(
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
  ) {}

  async login(req: LoginIF) {
    const path = ApiPath.Login;

    const res = await axiosAdapter.post<any>(
      `${path}`,
      req,
      this.headers
    );


    return res.data;
  }

  //  async permission(): Promise<PermissionRes> {
  //   const token = await this.cookiesAdapter.get(CookiesKey.AccessToken);
  //   let decodeToken = jwt.decode(token) as IDecodeToken;

  //   const path = ApiiPathUms.roleId.replace(
  //     "{role_id}",
  //     decodeToken.roles[0].id
  //   );

  //   const res = await axiosAdapterUms.get<PermissionRes>(path, {
  //     headers: {
  //       ...(token && { Authorization: `Bearer ${token}` }),
  //       "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
  //       "X-Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID as string,
  //     },
  //   });

  //   return res.data;
  // }
}
