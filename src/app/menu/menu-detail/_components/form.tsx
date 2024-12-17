"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import menuDtail from "../menuDtail.viewModel";
import { _getStorage, _setStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";
import menuViewModel from "../../menu.veiwModel";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const FormComponents = () => {
  const [spicy, setSpicy] = useState<number>(2);
  const [pickledFish, setpickledFish] = useState<number>(1);
  const [countvalue, setcountvalue] = useState<number>(1);
  const [form] = useForm();

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setSpicy(e.target.value);
  };

  const onChangepickledFish = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setpickledFish(e.target.value);
  };

  const countNumer = (value: string) => {
    if (value === "subtract") {
      setcountvalue(Math.max(countvalue - 1, 0));
    } else {
      setcountvalue(countvalue + 1);
    }
  };

  const addCart = () => {
    const value = {
      menuID: menuDtail.itemDetailOne.id,
      menuName: menuDtail.itemDetailOne.name,
      count: countvalue,
      spicy: spicy,
      pickledFish: pickledFish,
      price: menuDtail.itemDetailOne.price,
      picture: `data:image/jpeg;base64,${menuDtail.itemDetailOne.files}`,
    };
    runInAction(() => {
      menuDtail.countCart = true;
    });
    const getStorage = _getStorage(KEY_STORAGE.SET_CART);
    if (getStorage) {
      _setStorage(KEY_STORAGE.SET_CART, [...getStorage, value]);
    } else {
      _setStorage(KEY_STORAGE.SET_CART, [value]);
    }
    menuViewModel.calculateTotalPrice();
  };

  return (
    <Row>
      <Col span={24}>
        <Form form={form} onFinish={addCart}>
          <Form.Item>
            <p style={{ fontSize: "3.2vw", fontWeight: "bold" }}>
              เลือกระดับความเผ็ด
            </p>
            <Radio.Group onChange={onChange} value={spicy}>
              <Radio value={1} style={{ fontSize: "2.5vw" }}>
                เผ็ดน้อย
              </Radio>
              <Radio value={2} style={{ fontSize: "2.5vw" }}>
                เผ็ดปกติ
              </Radio>
              <Radio value={3} style={{ fontSize: "2.5vw" }}>
                เผ็ดมาก
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>เลือกปลาร้า</p>
            <Radio.Group onChange={onChangepickledFish} value={pickledFish}>
              <Radio value={1} style={{ fontSize: "2.5vw" }}>
                ปลาร้า
              </Radio>
              <Radio value={2} style={{ fontSize: "2.5vw" }}>
                ไม่ปลาร้า
              </Radio>
            </Radio.Group>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <p style={{ fontSize: "3vw", fontWeight: "bold" }}>
              ฿ {menuDtail.itemDetailOne.price * countvalue}
            </p>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <Space.Compact>
                  <Button onClick={() => countNumer("subtract")}>-</Button>
                  <Input
                    value={countvalue}
                    style={{ width: "60px", textAlign: "center" }}
                    readOnly
                  />
                  <Button onClick={() => countNumer("add")}>+</Button>
                </Space.Compact>
              </div>
            </Form.Item>
          </div>
          <Col xl={24} sm={24} style={{ width: "100%" }}>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "3vw", height: "100%" }}
            >
              Add to Cart
            </Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};
export default observer(FormComponents);
