"use client";
import React, { useEffect, useState } from "react";
import { Col, Divider, Flex, FloatButton, Image, Row, Typography } from "antd";
import { observer } from "mobx-react";
import menuDtail from "./menuDtail.viewModel";
import { toJS } from "mobx";
import Title from "antd/es/skeleton/Title";
import { useRouter, useSearchParams } from "next/navigation";
import FormComponents from "./_components/form";
import { IoCartOutline } from "react-icons/io5";
import { _getStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";
import { Path } from "@/app/types/path.enum";

const MenuDetail = () => {
  const searchParams = useSearchParams();
  const ID = searchParams.get("id") as string;
  const router = useRouter();
  const [count, setcount] = useState(0)

  const getCart = _getStorage(KEY_STORAGE.SET_CART) || [];
  useEffect(() => {
    setcount(getCart.length)
     menuDtail.getMenuByID(ID);
  }, [menuDtail.countCart]);

  return (
    <>
      <Row>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ margin: "10px 2px" }}
        >
          <Image
            width="100%"
            height="100%"
            src={`data:image/jpeg;base64,${menuDtail.itemDetailOne.files}`}
          />
        </Flex>
        <Col xl={24} sm={24} style={{ margin: 5 }}>
          <Flex vertical justify="start" align="start" style={{ marginTop: 1 }}>
            <Typography.Title level={3}>
              {menuDtail.itemDetailOne.name}
            </Typography.Title>
          </Flex>
          <p style={{ marginLeft: 5, fontSize: "2.8vw", textAlign: "center" }}>
            ทุกเมนูของทางร้านใส่ปลาร้าต้มสุก
            หากลูกค้าท่านใดไม่ทานปลาร้ากรุณาระบุด้วยนะคะ
          </p>
          <Divider />
          <FormComponents />
          <FloatButton.Group shape="circle" style={{ marginBottom: "35px" }}>
            <FloatButton
              badge={{ count:count }}
              icon={<IoCartOutline />}
              onClick={() => router.push(Path.Cart)}
            />
          </FloatButton.Group>
        </Col>
      </Row>
    </>
  );
};
export default observer(MenuDetail);
