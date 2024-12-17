"use client";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import {
  Card,
  Col,
  Typography,
  Input,
  Space,
  theme,
  Divider,
  Tabs,
  Row,
  FloatButton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CarouselComponents from "./_components/carousel";
import { DataMock } from "@/dataMock";
import CardSdieComponent from "./_components/crad-carousel";
import menuViewModel from "./menu.veiwModel";
import { IoCartOutline } from "react-icons/io5";
import menuDtail from "./menu-detail/menuDtail.viewModel";
import { _getStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";
import { useRouter } from "next/navigation";
import { Path } from "../types/path.enum";
import { runInAction } from "mobx";

const { Title } = Typography;

const Menu = () => {
  const { token } = theme.useToken();

  // Refs for sections
  const recommendedMenuRef = useRef<HTMLDivElement>(null);
  const allMenuRef = useRef<HTMLDivElement>(null);
  const drinkMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [fixedTabs, setFixedTabs] = useState(false); // State to track whether to fix tabs
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const getCart = _getStorage(KEY_STORAGE.SET_CART) || [];

  useEffect(() => {
    menuViewModel.getAllOrder();
    const handleScroll = () => {
      if (tabsContainerRef.current) {
        const { top } = tabsContainerRef.current.getBoundingClientRect();
        setFixedTabs(top <= 0);
      }
    };
    runInAction(() => {
      menuDtail.countCart = getCart?.length;
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, [menuDtail.countCart]);

  const handleTabClick = (key: string) => {
    if (key === "1" && recommendedMenuRef.current) {
      recommendedMenuRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (key === "2" && allMenuRef.current) {
      allMenuRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (key === "3" && drinkMenuRef.current) {
      drinkMenuRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Col span={24}>
            <div style={{ margin: "10px 0" }}>
              <Space.Compact
                size="large"
                style={{ width: "100%", backgroundColor: "#b8b8b83d" }}
              >
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder="Search menu"
                />
              </Space.Compact>
            </div>
          </Col>
          <Col span={24}>
            <CarouselComponents>
              {DataMock.img.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.images}
                    alt={`carousel-img-${item.id}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </CarouselComponents>
          </Col>
        </Col>
        <Divider>
          <p style={{ color: "#DCDCDE" }}>รายการอาหาร</p>
        </Divider>
        <Col span={24} style={{ marginLeft: "10px" }} ref={tabsContainerRef}>
          <Tabs
            defaultActiveKey="1"
            onTabClick={handleTabClick}
            items={[
              {
                label: "เมนูแนะนำ",
                key: "1",
              },
              {
                label: "รายการอาหาร",
                key: "2",
              },
              {
                label: "รายการเครื่องดื่ม/ข้าว",
                key: "3",
              },
            ]}
          />
        </Col>
        <Row
          style={{
            padding: 5,
            overflowY: "auto",
          }}
        >
          <Col xl={24} sm={24} ref={recommendedMenuRef}>
            <Title level={4}>
              เมนูแนะนำ <Divider />
            </Title>
          </Col>
          <Col>
            <CardSdieComponent data={menuViewModel.itemAllMenu} />
          </Col>
          <Col xl={24} sm={24} ref={allMenuRef}>
            <Title level={4}>
              รายการอาหาร <Divider />
            </Title>
          </Col>
          <Col>
            <CardSdieComponent data={menuViewModel.itemAllMenu} />
          </Col>
          <Col xl={24} sm={24} ref={drinkMenuRef}>
            <Title level={4}>
              เครื่องดื่ม/ข้าว <Divider />
            </Title>
          </Col>
          <Col>
            <CardSdieComponent data={menuViewModel.itemAllDrink} />
          </Col>

          <FloatButton.Group shape="circle" style={{ marginBottom: "35px" }}>
            <FloatButton
              badge={{ count: menuDtail.countCart || 0 }}
              icon={<IoCartOutline />}
              onClick={() => router.push(Path.Cart)}
            />
          </FloatButton.Group>
        </Row>
      </Row>
    </>
  );
};

export default observer(Menu);
