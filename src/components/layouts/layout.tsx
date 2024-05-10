"use client";

import { Layout } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import LayoutHeader from "./layoutHeader";
import LayoutSider from "./layoutSider";
import LayoutContent from "./layoutContent";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function LayoutMain({ children }: Props) {
  const path = usePathname();
  console.log("🚀 ~ parh:", path);
  return (
    <Layout style={{ height: "100vh" }}>
      <LayoutHeader />
      <Layout>
        {path == "/login" ? null : <LayoutSider />}
        <LayoutContent> {children}</LayoutContent>
      </Layout>
    </Layout>
  );
}
