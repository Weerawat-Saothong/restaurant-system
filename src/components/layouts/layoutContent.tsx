"use client";

import { Layout } from "antd";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function LayoutContent({ children }: Readonly<Props>) {
  const path = usePathname();
  return (
    <Layout.Content
      style={{
        backgroundColor: "#fff",
        padding: 5,
        marginLeft: 0,
        height: "100%",
        marginTop:"55px",
        width:"100%",
        maxWidth:"1024px",
        paddingBottom:"60px"
      }}
    >
      {children}
    </Layout.Content>
  );
}
