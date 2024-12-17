import { Carousel } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function CarouselComponents({ children }: Props) {
  return (
    <div>
      <Carousel autoplay>
        {React.Children.map(children, (child, index) => (
          <div key={index} style={contentStyle}>
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
