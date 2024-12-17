"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Card, Col, Row, Typography, Button, Input } from "antd";
import { _getStorage, _setStorage } from "@/utils/local-storage";
import { KEY_STORAGE } from "@/storage";
import styles from "./cart.module.css";
import menuViewModel from "../menu/menu.veiwModel";
import guardViewModel from "../guard/guard.viewModel";

const { Title, Text } = Typography;

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const getCart = _getStorage(KEY_STORAGE.SET_CART) || [];
    setCartItems(getCart);
  }, []);

  const handleQuantityChange = (index: number, delta: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].count += delta;
    if (newCartItems[index].count < 1) {
      newCartItems[index].count = 1;
    }
    setCartItems(newCartItems);
    _setStorage(KEY_STORAGE.SET_CART, newCartItems);
    menuViewModel.calculateTotalPrice();
  };

  const handleRemoveItem = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    _setStorage(KEY_STORAGE.SET_CART, newCartItems);
    menuViewModel.calculateTotalPrice();
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const onConfirm = () => {
    const value = {
      tableID: guardViewModel.tableID,
      menuOrders: cartItems.map((item) => ({
        menuID: item.menuID,
        pickledFish: item.pickledFish,
        spicy: item.spicy,
      })),

    };

  };

  return (
    <div className={styles.cart_container}>
      <Title level={2} className={styles.cart_title}>
        Order Food Online
      </Title>
      <Row gutter={[16, 16]}>
        {cartItems.map((item, index) => (
          <Col key={index} span={24}>
            <Card className={styles.cart_card} bordered={false}>
              <Row>
                <Col span={4}>
                  <img
                    src={item.picture}
                    alt={item.menuName}
                    className={styles.cart_image}
                  />
                </Col>
                <Col
                  span={14}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Text
                    strong
                    style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  >
                    {item.menuName}
                  </Text>
                </Col>
                <Col span={6} style={{ textAlign: "end" }}>
                  <Button
                    type="text"
                    danger
                    onClick={() => handleRemoveItem(index)}
                    className={styles.remove_button}
                  >
                    x
                  </Button>
                </Col>
              </Row>
              <Row align="middle" className={styles.cart_card_body}>
                <Col span={10}>
                  <Button onClick={() => handleQuantityChange(index, -1)}>
                    -
                  </Button>
                  <Input
                    value={item.count}
                    readOnly
                    className={styles.quantity_input}
                  />
                  <Button onClick={() => handleQuantityChange(index, 1)}>
                    +
                  </Button>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Text strong style={{ fontSize: "1.5rem" }}>
                    ฿ {item.price * item.count}
                  </Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <div className={styles.total_price}>
        <Text>Total Price</Text>
        <Text strong style={{ fontSize: "1.5rem" }}>
          ฿ {totalPrice}
        </Text>
      </div>
      <Button
        type="primary"
        block
        className={styles.checkout_button}
        onClick={() => onConfirm()}
      >
        Confirm Order
      </Button>
    </div>
  );
};

export default observer(Cart);
