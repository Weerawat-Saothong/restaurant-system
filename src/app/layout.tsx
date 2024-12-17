import LayoutMain from "@/components/layouts/layout";
import ThemeProvider from "@/providers/theme/theme.provider";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUM",
  description: "YUM",
  icons: "/images/lg_b.png",
};

interface RootLaoutProops {
  children: React.ReactNode;
  params: { locale: string };
}
export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<RootLaoutProops>) {
  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <LayoutMain>{children}</LayoutMain>
        </ThemeProvider>
      </body>
    </html>
  );
}
