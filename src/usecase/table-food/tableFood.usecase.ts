

import { MenuListReq } from "@/repository/types/menu.type";
import { MenuRepository, MenuRepositoryImpl } from "@/repository/menu.repository";
import { DataMock } from "@/dataMock";
import { IForm } from "@/app/menu/interface";

export interface TableFoodUsecase {
  execute(): Promise<any>;
  create(req:IForm): Promise<any>;
  update(id:string,req:IForm):Promise<any>
  delete(id:string):Promise<any>
}

export class TableFoodUsecaseImpl implements TableFoodUsecase {
  constructor(
    private menuRepository: MenuRepository = new MenuRepositoryImpl(),
  ) {}

  async execute(): Promise<any> {
    const data = await this.menuRepository.getAll();
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
