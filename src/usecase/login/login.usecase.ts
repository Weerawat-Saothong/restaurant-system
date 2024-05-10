import { LoginIF } from "@/app/[locale]/login/interface";
import {
    CookiesAdapter,
    CookiesAdapterImpl,
    CookiesKey,
  } from "../../adapters/cookies.adapter";
import { AuthRepository, AuthRepositoryImpl } from "@/repository/auth.repository";


  
  
  export interface LoginUsecase {
    execute(code:LoginIF): Promise<any>;
  }
  
  export class LoginUsecaseImpl implements LoginUsecase {
    constructor(
      private authRepository: AuthRepository = new AuthRepositoryImpl(),
      private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
    ) {}
  
    async execute(req: LoginIF): Promise<any> {
      const data = await this.authRepository.login(req);
  
      this.cookiesAdapter.set(
        CookiesKey.AccessToken,
        data.access_token,
        data.expires_in
      );
  
      if (!data.enabled_otp) {
        this.cookiesAdapter.set(
          CookiesKey.RefreshToken,
          data.refresh_token,
          data.refresh_expires_in
        );
      }
  
      return data;
    }
  }
  