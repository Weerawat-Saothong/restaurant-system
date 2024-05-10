import { AxiosRequestConfig } from "axios";
import axiosAdapter from "../adapters/axios.adapter";

import { Response } from "./types/response.type";
import { IForm } from "@/app/menu/interface";
import { ApiPath } from "./types/api-path.type";
import { MenuListReq, MenuListRes } from "./types/menu.type";
import { requestConfig } from "./types/request.config";

export interface MenuRepository {
  getAll(req: MenuListReq): Promise<Response<any>>;
  //   create(req: IForm): Promise<Response<any>>;
  //   getId(id: string): Promise<Response<any>>;
  //   update(
  //     id: string,
  //     req: IForm
  //   ): Promise<Response<any>>;
  //   delete(id: string): Promise<Response<any>>;
}

export class MenuRepositoryImpl implements MenuRepository {
  get headers(): AxiosRequestConfig {
    return requestConfig();
  }

  async getAll(req: MenuListReq) {
    const path = ApiPath.GetMenu;

    const urlSearchParams = new URLSearchParams({
      page: req?.page ?? "1",
      limit: req?.limit ?? "10",
    }).toString();

    const res = await axiosAdapter.get<Response<MenuListRes>>(
      `${path}?${urlSearchParams}`,
      this.headers
    );

    return res.data;
  }

  //   async create(req: CategoryCreateReq) {
  //     const path = ApiPath.CreateCategory;

  //     const res = await axiosAdapter.post<Response<CategoryCreateRes>>(
  //       `${path}`,
  //       req,
  //       this.headers
  //     );

  //     return res.data;
  //   }

  //   async getId(id: string) {
  //     const path = ApiPath.GetIdCategory.replace("{id}", id);

  //     const res = await axiosAdapter.get<Response<CategoryIdRes>>(
  //       `${path}`,
  //       this.headers
  //     );

  //     return res.data;
  //   }

  //   async update(id: string, req: CategoryUpdateReq) {
  //     const path = ApiPath.UpdateCategory.replace("{id}", id);

  //     const res = await axiosAdapter.put<Response<CategoryUpdateRes>>(
  //       `${path}`,
  //       req,
  //       this.headers
  //     );

  //     return res.data;
  //   }

  //   async delete(id: string) {
  //     const path = ApiPath.DeleteCategory.replace("{id}", id);

  //     const res = await axiosAdapter.delete<Response<CategoryDeleteRes>>(
  //       `${path}`,
  //       this.headers
  //     );

  //     return res.data;
  //   }
}
