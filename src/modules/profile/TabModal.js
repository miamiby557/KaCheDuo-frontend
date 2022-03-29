import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Tabs} from "antd";
import {changeTab, getUser} from "./actions";
import EditTab from "./EditTab";
import AccountTab from "./AccountTab";
import {getPrincipal} from "../../lib/identity";

const TabPane = Tabs.TabPane;

class TabModal extends PureComponent {
    componentWillMount() {
        const {dispatch} = this.props;
        const principal = getPrincipal();
        dispatch(getUser(principal.id));
    };


    handleTabChange = (active) => {
        const {dispatch} = this.props;
        dispatch(changeTab(active));
    };

    render() {
        const {activeKey} = this.props;
        return (
            <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={this.handleTabChange}>
                <TabPane tab="基本信息" key="1">
                    <EditTab/>
                </TabPane>
                <TabPane tab="修改密码" key="2">
                    <AccountTab/>
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.profile.tab,
    };
};


export default connect(mapStateToProps)(TabModal);
