import { Path } from "@/app/types/path.enum";
import { Card, Carousel, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import { toJS } from "mobx";
import { useRouter } from "next/navigation";
import React from "react";
import { ItemRes } from "../interface";
import menuDtail from "../menu-detail/menuDtail.viewModel";

type Props = {
  data: any;
};

export default function CardSdieComponent({ data }: Props) {
  const router = useRouter();

  const onClickCard = async (value: ItemRes) => {
    menuDtail.itemDetailOne = value;
     await router.push(Path.DetailMenu);
  };
  return (
    <div>
      <Flex
        gap={8}
        style={{
          width: "100%",
          overflow: "auto",
          padding: 10,
        }}
      >
        {data?.map((item: ItemRes) => (
          <Card
            key={item.id}
            style={{
              marginBottom: "16px",
              height: "250px",
              minWidth: "180px",
            }}
            cover={
              <img
                alt="example"
                src={`data:image/jpeg;base64,${item.files}`}
                style={{ width: "180px", height: "180px" }}
              />
            }
            onClick={() => router.push(`${Path.DetailMenu}?id=${item.id}`)}
          >
            <Meta
              style={{ textAlign: "center", padding: 5 }}
              title={item.name}
              description={` ฿ ${item.price}`}
            />
          </Card>
        ))}
      </Flex>
    </div>
  );
}
