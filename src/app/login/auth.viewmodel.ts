import { CookiesAdapter, CookiesKey } from "@/adapters/cookies.adapter";
import { JwtAdapter } from "@/adapters/jwt.adapter";
import { configure, makeAutoObservable, toJS } from "mobx";
// import {
//   CookiesAdapter,
//   CookiesAdapterImpl,
//   CookiesKey,
// } from "../../adapters/cookies.adapter";
// import { JwtAdapter, JwtAdapterImpl } from "../../adapters/jwt.adapter";

// import { AttributesPermission } from "../../repositories/types/auth.type";
// import {
//   LogoutUsecase,
//   LogoutUsecaseImpl,
// } from "../../usecases/auth/logout.usecase";
// import {
//   VerifyUsecase,
//   VerifyUsecaseImpl,
// } from "../../usecases/auth/verify.usecase";

configure({
  enforceActions: "never",
});

export class AuthViewModel {
  private jwtPayload: any = null;
  token = "";
  expired = false;
  closable = false;
  open = false;
  isReady = false;
  permission: any = {
    category_edit: true,
    issue_list: true,
    menu_sub_category: true,
    user_management_create: true,
    menu_category: true,
    menu_user_management: true,
    project_edit: true,
    project_create: true,
    user_management_list: true,
    sub_category_create: true,
    category_list: true,
    menu_setting: true,
    issue_delete: true,
    sub_category_delete: true,
    sub_category_edit: true,
    menu_issue: true,
    menu_issue_board: true,
    menu_project: true,
    issue_create: true,
    category_create: true,
    menu_report: true,
    menu_dashboard: true,
    sub_category_list: true,
    project_delete: true,
    project_list: true,
    issue_detail: true,
    user_management_edit: true,
    user_management_delete: true,
    category_delete: true,
  };

  // constructor(
  //   private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl(),
  //   private jwtAdapter: JwtAdapter = new JwtAdapterImpl(),
  //   private verifyUsecase: VerifyUsecase = new VerifyUsecaseImpl(),
  //   private logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl()
  // ) {
  //   makeAutoObservable(this);
  // }

  get payload() {
    return toJS(this.jwtPayload);
  }

  reset() {
    this.jwtPayload = null;
    this.token = "";
    this.expired = false;
    this.closable = false;
    this.open = false;
    this.isReady = false;
    this.permission = {
      category_edit: false,
      issue_list: false,
      menu_sub_category: false,
      user_management_create: false,
      menu_category: false,
      menu_user_management: false,
      project_edit: false,
      project_create: false,
      user_management_list: false,
      sub_category_create: false,
      category_list: false,
      menu_setting: false,
      issue_delete: false,
      sub_category_delete: false,
      sub_category_edit: false,
      menu_issue: false,
      menu_issue_board: false,
      menu_project: false,
      issue_create: false,
      category_create: false,
      menu_report: false,
      menu_dashboard: false,
      sub_category_list: false,
      project_delete: false,
      project_list: false,
      issue_detail: false,
      user_management_edit: false,
      user_management_delete: false,
      category_delete: false,
    };
  }

  // getAccessToken() {
  //   const resultAccessToken = this.cookiesAdapter.get(CookiesKey.AccessToken);
  //   if (resultAccessToken) {
  //     this.token = resultAccessToken;
  //     const resultPayload = this.jwtAdapter.decode(this.token);
  //     this.jwtPayload = resultPayload;
  //   } else {
  //     this.jwtPayload = null;
  //     this.token = "";
  //   }
  // }

  // checkTokenExpired() {
  //   if (!this.token) return;
  //   const resultPayload = this.jwtAdapter.decode(this.token);
  //   if (resultPayload.exp) {
  //     const expire = this.isTokenExpired(resultPayload.exp);
  //     this.expired = expire;
  //   }
  // }

  isTokenExpired(exp: number) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime > exp;
  }

  // async verify() {
  //   const verify = await this.verifyUsecase.execute();
  //   this.isReady = verify;
  //   this.permission = await this.cookiesAdapter.get(CookiesKey.Permission);
  //   return verify;
  // }

  // async logout() {
  //   await this.deleteSession();
  //   this.reset();
  //   this.resetCookies();
  // }

  // resetCookies() {
  //   this.cookiesAdapter.delete(CookiesKey.AccessToken);
  //   this.cookiesAdapter.delete(CookiesKey.RefreshToken);
  //   this.cookiesAdapter.delete(CookiesKey.Permission);
  // }

  // private async deleteSession() {
  //   try {
  //     await this.logoutUsecase.execute();
  //     return;
  //   } catch (error) {
  //     return;
  //   }
  // }

//   checkAuthRouteUrl(permission: boolean) {
//     if (permission) {
//       return true;
//     } else {
//       this.logout();
//     }
//   }
 }

const authViewModel = new AuthViewModel();

export default authViewModel;
