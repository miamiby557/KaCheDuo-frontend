import React from "react";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

const PageHeader = ({ routeParams: { selectedRoutes = [] } }) => {
  const current = selectedRoutes[selectedRoutes.length - 1];
  if (current && current.hideBreadcrumb !== true) {
    return (
      <div className={styles.pageHeader}>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <Icon type="desktop" /> 首页
            </Link>
          </Breadcrumb.Item>
          {selectedRoutes.map(route => (
            <Breadcrumb.Item key={route.path}>
              <Link to={route.path}>
                <Icon type={route.icon} /> {route.title}
              </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    );
  }

  return null;
};

export default PageHeader;
