"use client";

import { Layout, Row } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function LayoutContent({ children }: Props) {
  return (
    <Layout.Content style={{ backgroundColor: "#fff",padding:10 }}>
      {children}
    </Layout.Content>
  );
}
