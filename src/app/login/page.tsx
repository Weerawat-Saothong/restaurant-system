"use client";
import { App, Button, Card, Col, Form, Input, Row, Spin, notification } from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import loginViewModel from "./login.veiwmodel";
import { Path } from "@/app/types/path.enum";
import Title from "antd/es/skeleton/Title";
import { useTranslations } from "next-intl";
import { values } from "mobx";
import { LoginIF } from "./interface";

interface Props {}

export default function Login({}: Props) {
  const route = useRouter();
  const searchParams = useSearchParams();
  // const t = useTranslations('Login')

  //   useEffect(() => {
  //     login(searchParams.get("code") as string);
  //   });

  const onFinish = async (values: LoginIF) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const routo = await loginViewModel.login(values);
      console.log("🚀 ~ onFinish ~ routo:", routo);
      if (routo) {
        console.log("🚀 ~ onFinish ~ sdfffffffffff:", routo);
        notification.success({
          message: "Notification Success",
          description: "Login Success",
        });

        route.push(Path.DashBoard);
      }
    } catch (error: any) {
      notification.error({
        message: "Notification Error",
        description: error.message,
      });
    }
  };

  return (
    <Row
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Col xs={22} sm={24} md={16} lg={12} xl={8}>
        <Card>
          <h3 style={{ textAlign: "center" }}>LOGIN</h3>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
