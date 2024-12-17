import { AxiosRequestConfig } from "axios";
import axiosAdapter from "../adapters/axios.adapter";

import { Response } from "./types/response.type";
import { IForm, ItemRes } from "@/app/menu/interface";
import { ApiPath } from "./types/api-path.type";
import { MenuListReq, MenuListRes } from "./types/menu.type";
import { requestConfig } from "./types/request.config";

export interface MenuRepository {
  getAll(): Promise<Response<any>>;
  // getAll(req: MenuListReq): Promise<Response<any>>;
  create(req: IForm): Promise<Response<any>>;
  getOne(id: string): Promise<Response<ItemRes>>;
  update(id: string, req: IForm): Promise<Response<any>>;
  delete(id: string): Promise<Response<any>>;
}

export class MenuRepositoryImpl implements MenuRepository {
  get headers(): AxiosRequestConfig {
    return requestConfig();
  }

  async getAll() {
    const path = ApiPath.GetMenu;

    // const urlSearchParams = new URLSearchParams({
    //   page: req?.page ?? "1",
    //   limit: req?.limit ?? "10",
    // }).toString();

    const res = await axiosAdapter.get<Response<MenuListRes>>(
      `${path}`,
      // `${path}?${urlSearchParams}`,
      //  this.headers
    );

    return res.data;
  }

  async create(req: IForm) {
    const path = ApiPath.CreateMenu;

    const res = await axiosAdapter.post<Response<MenuListRes>>(
      `${path}`,
      req,
       this.headers
    );

    return res.data;
  }

  async getOne(id: string) {
    const path = ApiPath.UpdateMenu.replace("{id}", id);

    const res = await axiosAdapter.get<Response<any>>(
      `${path}`,
     this.headers
    );

    return res.data;
  }

  async update(id: string, req: IForm) {
    const path = ApiPath.UpdateMenu.replace("{id}", id);

    const res = await axiosAdapter.put<Response<MenuListRes>>(
      `${path}`,
      req,
     this.headers
    );

    return res.data;
  }

  async delete(id: string) {
    const path = ApiPath.DeleteMenu.replace("{id}", id);

    const res = await axiosAdapter.delete<Response<MenuListRes>>(
      `${path}`,
      this.headers
    );

    return res.data;
  }
}
