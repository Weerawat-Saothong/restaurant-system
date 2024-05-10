import { makeAutoObservable } from "mobx";
import { LoginIF } from "./interface";
import { LoginUsecase, LoginUsecaseImpl } from "@/usecase/login/login.usecase";

export class LoginViewModel {
  constructor(private loginUsecase: LoginUsecase = new LoginUsecaseImpl()) {
    makeAutoObservable(this);
  }

  async login(value: LoginIF) {
    // const result = await this.loginUsecase.execute(value);

    // return result;
    return true
  }
}

const loginViewModel = new LoginViewModel();

export default loginViewModel;
