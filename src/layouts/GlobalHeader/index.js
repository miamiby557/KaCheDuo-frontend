import React, {PureComponent} from "react";
import {Avatar, Divider, Dropdown, Icon, Menu, Spin, TreeSelect} from "antd";
import {Link} from "react-router-dom";
import styles from "./index.module.less";
import avatar from "../../assets/user_avatar.png";
import {getPrincipal} from "../../lib/identity";

const TreeNode = TreeSelect.TreeNode;

const renderTreeNodes = (dataSource) => {
    return dataSource && dataSource.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.name} key={item.id} value={item.id}>
                    {renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode title={item.name} key={item.id} value={item.id}/>;
    });
};

export default class GlobalHeader extends PureComponent {
    toggle = () => {
        const {onCollapse} = this.props;
        onCollapse && onCollapse();
    };

    render() {
        let {identity, collapsed, isMobile, logo, onMenuClick} = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="logout">
                    <Icon type="logout"/>退出登录
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32"/>
                    </Link>,
                    <Divider type="vertical" key="line"/>
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    {getPrincipal().account + '(' + getPrincipal().company + ")"}
                    <Divider type="vertical" key="line"/>
                    {identity.account ? (
                        <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={avatar}/>
                <span className={styles.name}>{identity.fullName}</span>
              </span>
                        </Dropdown>
                    ) : (
                        <Spin
                            size="small"
                            style={{
                                marginLeft: 8
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
}
