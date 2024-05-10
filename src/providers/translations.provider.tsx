"use client";

import { createInstance } from "i18next";
import { NextPage } from "next";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Locale, PageName } from "../i18n/types";
import initTranslations from "../utils/init-translations.util";

interface Props {
  children: React.ReactNode;
  locale: Locale;
  pageName: PageName[];
  resources: Record<string, any>;
}

const TranslationsProvider: NextPage<Props> = ({
  children,
  locale,
  pageName,
  resources,
}) => {
  const i18n = createInstance() as any;

  initTranslations({ locale, pageName, i18nInstance: i18n, resources });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
