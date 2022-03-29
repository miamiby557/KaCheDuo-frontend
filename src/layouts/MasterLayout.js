import React, {PureComponent} from "react";
import {Layout, notification} from "antd";
import SiderMenu from "./SiderMenu";
import logo from "../assets/logo.png";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import PageHeader from "./PageHeader";
import {
    getPrincipal,
    identity,
    logout
} from "../lib/identity";
import Principal from '../components/Principal';
import {get} from "../lib/http";
import {connect} from "react-redux";

const {Content, Header, Footer} = Layout;

class MasterLayout extends PureComponent {
    state = {
        collapsed: false,
        isMobile: false
    };

    toogleCollapse = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    };

    onMenuClick = (e) => {
        if (e.key && e.key === "logout") {

            const principal = getPrincipal();
            get('/user/logout/' + principal.id).then(() => {
                notification.success({
                    message: "退出成功"
                });
                logout();
                window.location.href = "/";
            }).catch(ex => {
                notification.error({
                    message: ex.message
                });
                logout();
                window.location.href = "/";
            });

        }
    };


    render() {
        const {children, containerOrders, ...rest} = this.props;
        this.principal = new Principal(identity);
        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    collapsed={this.state.collapsed}
                    isMobile={this.state.isMobile}
                    onCollapse={this.toogleCollapse}
                    principal={this.principal}
                    {...rest}
                />
                <Layout>
                    <Header
                        style={{
                            padding: 0
                        }}
                    >
                        <GlobalHeader
                            logo={logo}
                            collapsed={this.state.collapsed}
                            isMobile={this.state.isMobile}
                            onCollapse={this.toogleCollapse}
                            onMenuClick={this.onMenuClick}
                            {...rest}
                        />
                    </Header>
                    <PageHeader {...rest} />
                    <Content
                        style={{
                            margin: "24px 24px 0",
                            height: "1px"
                        }}
                    >
                        {children}
                    </Content>

                    <Footer
                        style={{
                            padding: 0
                        }}
                    >
                        <GlobalFooter/>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.home
    };
};

export default connect(mapStateToProps)(MasterLayout);
