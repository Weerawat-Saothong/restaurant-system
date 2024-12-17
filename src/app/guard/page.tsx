"use client";

import React, { useEffect } from "react";
import { Row, notification, Spin } from "antd";
import { observer } from "mobx-react";
import { useRouter, useSearchParams } from "next/navigation";
import guardViewModel from "./guard.viewModel";
import { Path } from "@/app/types/path.enum";

const Guard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Uncomment this line once useSearchParams is correctly integrated
  // guardViewModel.tableID = searchParams.get("table");

  // For demonstration purposes, directly assigning a static tableID
  guardViewModel.tableID = "f2078953-07a0-4611-8906-cee56f47f19a";

  useEffect(() => {
    const checkGuard = async () => {
      const path = await guardViewModel.checkGuardByID(guardViewModel.tableID);
      if (path) {
        router.push(Path.Menu);
      } else {
        notification.warning({
          message: "Warning",
          description: "Scan QR Code again",
        });
      }
    };
    checkGuard();
  }, [guardViewModel.tableID]); // Add guardViewModel.tableID to dependency array

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Spin size="default" />
    </Row>
  );
};

export default observer(Guard);
