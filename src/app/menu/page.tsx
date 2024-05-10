"use client";

import { DataMock } from "@/dataMock";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import {
  Flex,
  Typography,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  Spin,
  Card,
  Input,
  Checkbox,
  Button,
  Space,
  TableProps,
  Table,
} from "antd";

import React, { useEffect } from "react";
import { TbListDetails } from "react-icons/tb";
import authViewModel from "../login/auth.viewmodel";
import menuViewModel from "./menu.veiwModel";
import { observer } from "mobx-react";
import ModalMenu from "./_components/modal";

type Props = {};

const Menu = ({}: Props) => {
  useEffect(() => {
    menuViewModel.getAllOrder();
  }, []);

  const columns: TableProps<any>[`columns`] = [
    {
      title: "ชื่อรายการอาหารและเครื่องดื่ม",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Flex gap={16} align="center">
          <Flex vertical>
            <Typography.Text>{text}</Typography.Text>
            <Typography.Text type="secondary">
              {/* Protect your account and withdrawals with a security key. */}
            </Typography.Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: "ราคา.",
      dataIndex: "price",
      key: "price",
      width: "175px",
      render: (text, record) => (
        <Flex gap={16} align="center">
          <Flex vertical>
            <Typography.Text>{text}</Typography.Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: "มีเมนู",
      dataIndex: "have_order",
      key: "have_order",
      width: "175px",
      render: (text, record) => (
        <Flex gap={16} align="center">
          <Flex vertical>
            <Checkbox checked={text} />
          </Flex>
        </Flex>
      ),
    },
    {
      key: "action",
      fixed: "right",
      width: "250px",
      render: (_, record) => (
        <Flex gap={8} justify="center" align="center">
          <Button
            disabled={!authViewModel.permission?.issue_detail}
            onClick={() => menuViewModel.onEdit(record)}
          >
            <Flex gap={6} justify="center" align="center">
              <TbListDetails style={{ fontSize: "18px" }} />
              แก้ไข
            </Flex>
          </Button>
          <Button
            danger
            type={"dashed"}
            icon={<DeleteOutlined />}
            // onClick={() => onRemove(record.id, record.name)}
            // disabled={
            //   !authViewModel.permission?.issue_delete ||
            //   record.status === "closed"
            // }
          >
            ลบ
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex flex={1} vertical>
        <Typography.Title level={4}>Overview Menu</Typography.Title>
      </Flex>
      <Row>
        <Card style={{ width: "100%" }}>
          <Row>
            <Flex flex={1} gap={8} style={{ marginBottom: 8 }}>
              <Typography.Title level={4}>รายการอาหาร</Typography.Title>
            </Flex>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
                marginBottom: 20,
              }}
            >
              {/* <Button style={{backgroundColor:"#CD5C5C",color:"#fff"}}>แก้ไข</Button> */}
              <Button onClick={() => menuViewModel.onCreate()} type="primary">
                เพิ่มเมนู
              </Button>
            </div>
          </Row>
          <Table
            columns={columns}
            dataSource={menuViewModel.itemAllMenu.Menu?.food}
          />
        </Card>
      </Row>
      <ModalMenu />
    </>
  );
};

export default observer(Menu);
