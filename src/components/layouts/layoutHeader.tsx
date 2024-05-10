"use client";

import { UserOutlined } from "@ant-design/icons";
import { Col, Layout, Row, theme } from "antd";
import React from "react";

type Props = {};

export default function LayoutHeader({}: Props) {
  const { token } = theme.useToken();

  return (
    <Layout.Header style={{ backgroundColor: "#F6AB57" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "20px", // Adjust the right padding as needed
        }}
      >
        <Col>{/* Your logo or any other header content */}</Col>
        <Col>
          <UserOutlined />
        </Col>
      </Row>
    </Layout.Header>
  );
}
