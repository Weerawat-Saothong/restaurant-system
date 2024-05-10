

import { MenuListReq } from "@/repository/types/menu.type";
import { MenuRepository, MenuRepositoryImpl } from "@/repository/menu.repository";
import { DataMock } from "@/dataMock";

export interface MenuUsecase {
  execute(rep: MenuListReq): Promise<any>;
}

export class MenuUsecaseImpl implements MenuUsecase {
  constructor(
    private menuRepository: MenuRepository = new MenuRepositoryImpl(),
  ) {}

  async execute(req: MenuListReq): Promise<any> {
    // const data = await this.menuRepository.getAll(req);
    // return data;
    return DataMock
  }
}
