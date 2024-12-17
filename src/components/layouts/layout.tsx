"use client";

import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import LayoutHeader from "./layoutHeader";
import LayoutContent from "./layoutContent";
import LayoutFooter from "./layoutFooter";
import { usePathname } from "next/navigation";
import { isMobileOrTablet } from "@/utils/isMobile";

type Props = {
  children: React.ReactNode;
};

export default function LayoutMain({ children }: Readonly<Props>) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const path = usePathname();
  console.log("🚀 ~ path:", path);

  useEffect(() => {
    setIsMobileDevice(isMobileOrTablet());
    const handleResize = () => {
      setIsMobileDevice(isMobileOrTablet());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobileDevice) {
    return null;
  }

  return (
    <Layout
      style={{
        margin: 0,
        maxWidth: "1024px",
      }}
    >
      <LayoutHeader />
      <LayoutContent>{children}</LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
