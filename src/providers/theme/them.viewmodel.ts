import { makeAutoObservable, runInAction } from "mobx";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../../adapters/cookies.adapter";

interface Store {
  mode: string;
  isDarkMode: boolean;
  isReady: boolean;
}

export class ThemeViewModel {
  private store: Store = {
    mode: "Light",
    isDarkMode: true,
    isReady: false,
  };

  constructor(
    private cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl()
  ) {
    makeAutoObservable(this);
  }

  get isDarkMode() {
    return this.store.isDarkMode;
  }

  get mode() {
    return this.store.mode;
  }

  get isReady() {
    return this.store.isReady;
  }

  set isReady(val: boolean) {
    runInAction(() => {
      this.store.isReady = val;
    });
  }

  set isDarkMode(val: boolean) {
    runInAction(() => {
      this.store.isDarkMode = val;
      this.cookiesAdapter.set(CookiesKey.DarkMode, val);
      if (val) {
        this.store.mode = "Dark";
      } else {
        this.store.mode = "Light";
      }
    });
  }

  initMode() {
    const darkMode = this.cookiesAdapter.get(CookiesKey.DarkMode);
    this.isDarkMode = darkMode;
    this.isReady = true;
  }
}

const themeViewModel = new ThemeViewModel();

export default themeViewModel;
