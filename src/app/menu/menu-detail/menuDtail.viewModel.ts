import { makeAutoObservable, runInAction } from "mobx";
import { ItemRes } from "../interface";
import { MenuUsecase, MenuUsecaseImpl } from "@/usecase/menu/menu.usecase";

export class MenuDatail {
  itemDetailOne: ItemRes = {
    base64Image: "",
    files: "",
    haveOrder: false,
    id: "",
    name: "",
    price: 0,
    type: "",
  };
  countCart: boolean = false;

  constructor(private menuUsecase: MenuUsecase = new MenuUsecaseImpl()) {
    makeAutoObservable(this);
  }
  async getMenuByID(id: string) {
    const result = await this.menuUsecase.getOne(id);

    if (result.result) {
      runInAction(() => {
        this.itemDetailOne = result.data;
      });
    }
  }
}
const menuDtail = new MenuDatail();

export default menuDtail;
