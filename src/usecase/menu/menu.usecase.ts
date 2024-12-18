

import { Response } from "@/repository/types/response.type";
import { MenuRepository, MenuRepositoryImpl } from "@/repository/menu.repository";
import { DataMock } from "@/dataMock";
import { IForm, ItemRes } from "@/app/menu/interface";

export interface MenuUsecase {
  execute(): Promise<any>;
  getOne(id:string): Promise<Response<ItemRes>>;
  create(req:IForm): Promise<any>;
  update(id:string,req:IForm):Promise<any>
  delete(id:string):Promise<any>
}

export class MenuUsecaseImpl implements MenuUsecase {
  constructor(
    private menuRepository: MenuRepository = new MenuRepositoryImpl(),
  ) {}

  async execute(): Promise<any> {
    const data = await this.menuRepository.getAll();
    return data;
    // return DataMock
  }
  async getOne(id:string):  Promise<Response<ItemRes>> {
    const data = await this.menuRepository.getOne(id);
    return data;
    // return DataMock
  }
  async create(req:IForm): Promise<any> {
    const data = await this.menuRepository.create(req);
    return data;
    // return DataMock
  }
  async update(id:string,req:IForm): Promise<any> {
    const data = await this.menuRepository.update(id,req);
    return data;
    // return DataMock
  }
  async delete(id:string): Promise<any> {
    const data = await this.menuRepository.delete(id);
    return data;
    // return DataMock
  }
}
