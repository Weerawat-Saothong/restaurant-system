import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "@/adapters/cookies.adapter";
import {
  GuardRepository,
  GuardRepositoryImpl,
} from "@/repository/guard.rrepository";
import { GuardRes } from "@/repository/types/guard.type";
import { Response } from "@/repository/types/response.type";

export interface GuardUsecase {
  getOne(id: string): Promise<Response<GuardRes>>;
}
export class GuardUsecaseImpl implements GuardUsecase {
  constructor(
    private menuRepository: GuardRepository = new GuardRepositoryImpl(),
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
  ) {}

  async getOne(id: string): Promise<Response<GuardRes>> {
    const data = await this.menuRepository.getOne(id);
    this.cookiesAdapter.set(CookiesKey.AccessToken, data.data);

    return data;
  }
}
