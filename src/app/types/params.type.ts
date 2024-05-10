import { Locale } from "../../i18n/types";

export interface LocaleParams {
  locale: Locale;
}

export interface Params<T = LocaleParams> {
  params: T;
}
