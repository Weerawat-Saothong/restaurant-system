"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Modal, Row, Spin, Typography, theme } from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useMobxEffect } from "../../hook/useMobxEffect";
import viewModel from "./auth.viewmodel";

interface Props {
  verify?: boolean;
  children: ReactNode;
}

const AuthProvider: NextPage<Props> = ({ verify, children }) => {
  // return <>{children}</>;
  return <SessionLogin verify={verify}>{children}</SessionLogin>;
};

const SessionLogin: NextPage<Props> = ({ verify, children }) => {
  const router = useRouter();

  const {
    token: { colorWarning },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const urlLogin =
    process.env.NEXT_PUBLIC_URL_LOGIN +
    `?redirect_uri=${process.env.NEXT_PUBLIC_URL_REDIRECT}` +
    `&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}` +
    `&client_secret=${process.env.NEXT_PUBLIC_API_KEY}` +
    `&response_type=code`;

  const onClick = () => {
    setOpen(false);
    viewModel.reset();
    viewModel.resetCookies();
    return router.push(urlLogin);
  };

  const checkVerify = async () => {
    const isVerify = await viewModel.verify();
    setIsReady(isVerify);

    if (!isVerify) {
      return router.push(urlLogin);
    }
  };

  viewModel.getAccessToken();

  useEffect(() => {
    if (verify) {
      checkVerify();
    }

    const interval = setInterval(() => {
      viewModel.checkTokenExpired();
    }, 1000);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMobxEffect(() => {
    if (viewModel.expired) {
      setOpen(true);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewModel.expired]);

  useMobxEffect(() => {
    if (!viewModel.token) {
      router.push(urlLogin);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewModel.token]);

  if (verify && !isReady)
    return (
      <Row style={{ height: "100vh" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Col>
      </Row>
    );

  return (
    <>
      {children}
      <Modal
        open={open}
        closeIcon={false}
        footer={() => (
          <>
            <Button onClick={onClick} type="primary">
              Ok
            </Button>
          </>
        )}
      >
        <Flex gap={16} align="start">
          <Flex>
            <Typography.Title level={5}>
              <InfoCircleOutlined style={{ color: colorWarning }} />
            </Typography.Title>
          </Flex>
          <Flex gap={8} vertical>
            <Typography.Title level={5}>
              Your session has expired.
            </Typography.Title>
            <Typography.Text type="secondary">
              Sign in again to continue working on awesome things!
            </Typography.Text>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default observer(AuthProvider);
