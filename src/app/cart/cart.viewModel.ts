import { makeAutoObservable, runInAction } from "mobx";
import {
  GuardUsecase,
  GuardUsecaseImpl,
} from "@/usecase/guard-usecase/guard.usecase";

export class CartViewModel {
  tableID: string = ""

  constructor(private menuUsecase: GuardUsecase = new GuardUsecaseImpl()) {
    makeAutoObservable(this);
  }
  async checkGuardByID(id: string) {
    try {
      const result = await this.menuUsecase.getOne(id);
      console.log("🚀 ~ GuardViewModel ~ checkGuardByID ~ result:", result);
      if (result.result) {
        return result.data;
      } else {
        return result.data;
      }
    } catch (error) {
   
    }
  }
}
const cartViewModel = new CartViewModel();

export default  cartViewModel;
