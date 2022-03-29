import React, {PureComponent} from "react";
import {Icon, Layout, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import adminRoutes from "../../app/adminRoutes";
import styles from "./index.module.less";
import userRoutes from "../../app/UserRoutes";

const {Sider} = Layout;

class SiderMenu extends PureComponent {
    getMenuItems = (routes) =>
        routes.map(
            route => {
                return route.children && true ? (
                    <Menu.SubMenu
                        key={route.path}
                        title={
                            <span>
                <Icon type={route.icon}/>
                <span>{route.title}</span>
              </span>
                        }
                    >
                        {this.getMenuItems(route.children)}
                    </Menu.SubMenu>
                ) : route.path && !route.hideOnMenu && true ? (
                    <Menu.Item key={route.path}>
                        <Link to={route.path}>
                            {route.icon && <Icon type={route.icon}/>}
                            <span>{route.title}</span>
                        </Link>
                    </Menu.Item>
                ) : null
            }
        );

    render() {
        const {
            collapsed,
            onCollapse,
            logo,
            routeParams: {selectedRoutes = []},
            principal
        } = this.props;

        const selectedPaths = selectedRoutes.map(item => item.path);
        const selectedKeys = selectedPaths.slice(-1);
        const openedKeys = selectedPaths.slice(0, -1);
        let treeList = undefined;
        if(principal.admin){
            treeList = adminRoutes;
        }else{
            treeList = userRoutes;
        }
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={256}
                className={styles.sider}
            >
                <div className={styles.logo} key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <Menu
                    key="Menu"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={selectedKeys}
                    defaultOpenKeys={openedKeys}
                    style={{
                        padding: "16px 0",
                        width: "100%"
                    }}
                >
                    {this.getMenuItems(treeList)}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SiderMenu);
