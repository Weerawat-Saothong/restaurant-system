import { Path } from "@/app/types/path.enum";
import { Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";

export default function LayoutFooter() {
  const [current, setCurrent] = useState("menu");
  const router = useRouter();

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      label: "Menu",
      key: "menu",
      icon: <MdOutlineMenuBook />,
      onClick: () => router.push(Path.Menu),
    },
    {
      label: "Cart",
      key: "cart",
      icon: <TiShoppingCart />,
      onClick: () => router.push(Path.Cart),
    },
    {
      label: "Payment",
      key: "pay",
      icon: <RiMoneyDollarCircleFill />,
      onClick: () => router.push(Path.Payment),
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout.Footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: "1024px",
        backgroundColor: "#fff",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          width: "100%",
          justifyContent: "space-evenly",
        }}
      />
    </Layout.Footer>
  );
}
