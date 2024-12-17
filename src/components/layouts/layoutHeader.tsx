"use client";

import menuViewModel from "@/app/menu/menu.veiwModel";
import { KEY_STORAGE } from "@/storage";
import { _getStorage } from "@/utils/local-storage";
import { Layout, Row, Col, Typography, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type Props = {};

const LayoutHeader = ({}: Props) => {
  const { token } = theme.useToken();
  menuViewModel.calculateTotalPrice();

  return (
    <Header
      style={{
        backgroundColor: token.colorPrimary,
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "5px 10px",
        zIndex: 999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Row align="middle" gutter={8} style={{ width: "100%" }}>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <FaUserCircle size={30} />
          <Typography.Title level={5} style={{ margin: "0 0 0 10px" }}>
            โต๊ะ No.1
          </Typography.Title>
        </Col>
        <Col style={{ marginLeft: "auto" }}>
          <Typography.Text style={{ color: "#fff" }}>
            $ {menuViewModel.totalPrice}
          </Typography.Text>
        </Col>
      </Row>
    </Header>
  );
};

export default observer(LayoutHeader);
