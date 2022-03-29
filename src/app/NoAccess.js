import React from "react";
const NoAccess = ({ location }) => {

  return (
    <div>
      <h3>
        {/*你没有权限访问此页面 <code>{location.pathname} <a href="JavaScript:history.go(-1)">返回</a></code>*/}
        你没有权限访问此页面 <code>{location.pathname} <a href="/">返回首页</a></code>
      </h3>
    </div>
  );
};

export default NoAccess;
