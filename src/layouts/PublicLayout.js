import React from "react";
import { Link } from "react-router-dom";
import GlobalFooter from "./GlobalFooter";
import styles from "./PublicLayout.module.less";
import logo from "../assets/logo.png";

const PublicLayout = props => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>两客监控服务系统</span>
            </Link>
          </div>
          <div className={styles.desc}>为您实现信息化管理，数据化经营</div>
        </div>
        <div className={styles.main}>{props.children}</div>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default PublicLayout;
