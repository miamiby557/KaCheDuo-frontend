import React from "react";
import { Card } from "antd";

const Section = ({ children }) => {
  return <Card bordered={false}>{children}</Card>;
};

export default Section;
