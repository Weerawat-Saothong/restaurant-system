"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Divider, Button } from "antd";
import { observer } from "mobx-react";
import { _getStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";

const Payment = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const getCart = _getStorage(KEY_STORAGE.SET_CART) || [];
    setCartItems(getCart);
  }, []);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col>
        <Card
          style={{
            width: "400px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            marginBottom: "20px   ",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Typography.Title level={4} style={{ margin: 0 }}>
              Pay Your Bill
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              ฿ {totalPrice}
            </Typography.Title>
          </div>
          <Divider />
          {cartItems.map((item, index) => (
            <Row
              key={index}
              style={{
                padding: "10px ",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Col span={2} style={{ textAlign: "start" }}>
                {index + 1}
              </Col>
              <Col span={10} style={{ textAlign: "start" }}>
                {item.menuName}
              </Col>
              <Col span={6} style={{ textAlign: "end" }}>
                {item.count}
              </Col>
              <Col span={6} style={{ textAlign: "end" }}>
                ฿ {item.price * item.count}
              </Col>
            </Row>
          ))}
        </Card>
        <Button type="primary" block>
          Payment
        </Button>
      </Col>
    </Row>
  );
};

export default observer(Payment);
