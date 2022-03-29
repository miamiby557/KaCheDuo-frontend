import React from "react";

import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      textAlign: "center"
    }}
  >
    <Spin size="large" />
    加载中 ...
  </div>
);

export default Loading;
