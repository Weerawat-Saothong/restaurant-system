import { MenuListReq } from "@/repository/types/menu.type";
import { MenuUsecase, MenuUsecaseImpl } from "@/usecase/menu/menu.usecase";
import { makeAutoObservable, action, runInAction } from "mobx";
import { IForm } from "./interface";
import { Path } from "../types/path.enum";
import { notification } from "antd";
import { DataMock } from "@/dataMock";
import { _getStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";

export class MenuViewModel {
  isOpenModalCreate = false;
  isOpenModalEdit = false;
  itemEdit: any = {};
  type = "";
  page = 1;
  pageSize = 10;
  itemAllMenu: any = [];
  itemAllDrink: any = [];
  totalPrice: number = 0;

  constructor(private menuUsecase: MenuUsecase = new MenuUsecaseImpl()) {
    makeAutoObservable(this, {
      calculateTotalPrice: action // mark calculateTotalPrice as an action
    });
  }

  async getAllOrder() {
    const result = await this.menuUsecase.execute();

    if (result.result) {
      runInAction(() => {
        this.itemAllMenu = result.data.filter((f: any) => {
          return f.type === "TY001";
        });
        this.itemAllDrink = result.data.filter((f: any) => {
          return f.type === "TY002";
        });
      });
    }
  }

  async onFinishCreate(req: IForm) {
    const result = await this.menuUsecase.create(req);
    if (result.result) {
      runInAction(() => {
        this.isOpenModalCreate = false;
      });
      notification.success({
        message: "Notification Success",
        description: "Login Success",
      });

      this.getAllOrder();
    }
  }

  async onFinishEdit(id: string, req: IForm) {
    const result = await this.menuUsecase.update(id, req);
    if (result.result) {
      runInAction(() => {
        this.isOpenModalEdit = false;
        this.itemEdit = "";
      });
      notification.success({
        message: "Notification Success",
        description: "Login Success",
      });

      this.getAllOrder();
    }
  }

  onCreate() {
    runInAction(() => {
      this.type = "Create";
      console.log("openModal", true);
      this.isOpenModalCreate = true;
    });
  }

  onEdit(value: any) {
    runInAction(() => {
      console.log("Edit==", value);
      this.itemEdit = value;
      this.type = "Edit";
      this.isOpenModalEdit = true;
    });
  }

  async onRemove(id: string) {
    const result = await this.menuUsecase.delete(id);
    if (result.result) {
      notification.success({
        message: "Notification Success",
        description: "Login Success",
      });

      this.getAllOrder();
    }
  }

  calculateTotalPrice(): void {
    const data = _getStorage(KEY_STORAGE.SET_CART) || [];
    const sumWithInitial = data.reduce(
      (accumulator: any, currentValue: any) => {
        return accumulator + currentValue.price * currentValue.count;
      },
      0
    );
    runInAction(() => {
      this.totalPrice = sumWithInitial;
    });
  }
}
const menuViewModel = new MenuViewModel();
export default menuViewModel;
