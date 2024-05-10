import { MenuListReq } from "@/repository/types/menu.type";
import { MenuUsecase, MenuUsecaseImpl } from "@/usecase/menu/menu.usecase";
import { makeAutoObservable } from "mobx";

export class MenuViewModel {
  isOpenModalCreate = false;
  isOpenModalEdit = false;
  type = "";
  page = 1;
  pageSize = 10;
  itemAllMenu: any = {};
  constructor(private menuUsecase: MenuUsecase = new MenuUsecaseImpl()) {
    makeAutoObservable(this);
  }
  async getAllOrder(req?: MenuListReq) {
    const result = await this.menuUsecase.execute({
      page: String(this.page),
      limit: String(this.pageSize),
    });
    this.itemAllMenu = result;
    console.log("🚀 ~ MenuViewModel ~ getAllOrder ~ result:", result);
  }

  onCreate() {
    this.type = "Create";
    console.log("openModal", true);
    this.isOpenModalCreate = true;
  }
  onEdit(value: any) {
    console.log("Edit==", value);
    this.type = "Edit";
    this.isOpenModalEdit = true;
  }
}
const menuViewModel = new MenuViewModel();
export default menuViewModel;
