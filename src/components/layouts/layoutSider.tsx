"use client";

import { BreadcrumbTitle } from "@/app/types/breadcrumb.enum";
import { Path } from "@/app/types/path.enum";
import { BarChartOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { GoIssueOpened } from "react-icons/go";

import { Layout, Menu, MenuProps, Row } from "antd";
import React, { Key, ReactNode } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import authViewModel from "@/app/login/auth.viewmodel";
import { useRouter } from "next/navigation";

type Props = {};
type MenuItem = Required<MenuProps>["items"][number];
export default function LayoutSider({}: Props) {
  const router = useRouter();

//   const onClick: MenuProps["onClick"] = (e) => {
//     router.push(e.key);
//     consoleViewModel.selectedKeys = e.key as Path;
//     consoleViewModel.openKeys = [e.keyPath[1]] || [];
//   };
  const getItem = (
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    ...(authViewModel.permission?.menu_dashboard
      ? [
          getItem(
            BreadcrumbTitle.DashBoard,
            Path.DashBoard,
            <BarChartOutlined />
          ),
        ]
      : []),
    ...(authViewModel.permission?.menu_issue
      ? [getItem(BreadcrumbTitle.Issue, Path.Issue, <MenuOutlined  />)]
      : []),
    ...(authViewModel.permission?.menu_setting
      ? [
          getItem(
            BreadcrumbTitle.Settings,
            Path.Settings,
            <SettingOutlined />,
            [
              ...(authViewModel.permission?.menu_project
                ? [
                    getItem(
                      BreadcrumbTitle.Project,
                      Path.Project,
                      <AiOutlineProject style={{ fontSize: "18px" }} />
                    ),
                  ]
                : []),
              ...(authViewModel.permission?.menu_category
                ? [
                    getItem(
                      BreadcrumbTitle.Category,
                      Path.Category,
                      <MdOutlineCategory style={{ fontSize: "18px" }} />
                    ),
                  ]
                : []),
              ...(authViewModel.permission?.menu_sub_category
                ? [
                    getItem(
                      BreadcrumbTitle.SubCategory,
                      Path.SubCategory,
                      <TbCategoryPlus style={{ fontSize: "18px" }} />
                    ),
                  ]
                : []),
              ...(authViewModel.permission?.menu_user_management
                ? [
                    getItem(
                      BreadcrumbTitle.UserManagement,
                      Path.UserManagement,
                      <RiUserSettingsLine style={{ fontSize: "18px" }} />
                    ),
                  ]
                : []),
              ...(authViewModel.permission?.menu_user_management
                ? [
                    getItem(
                      BreadcrumbTitle.SlaManagement,
                      Path.SlaManagement,
                      <BiTimer style={{ fontSize: "18px" }} />
                    ),
                  ]
                : []),
            ]
          ),
        ]
      : []),
  ];

  return (
    <Layout.Sider style={{ width: "500px", backgroundColor: "#FFFFFF" }}>
      <Row>
        <Menu
          theme="light"
          //   selectedKeys={[selectedKeys]}
          //   openKeys={openKeys}
          mode="inline"
          style={{ border: "none" }}
          items={items}
          //   onClick={onClick}
          //   onOpenChange={onOpenChange}
        />
      </Row>
    </Layout.Sider>
  );
}
