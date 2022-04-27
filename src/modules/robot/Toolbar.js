import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification} from "antd";
import {runOnceLocation, sendMail, showCreate} from "./actions";

class Toolbar extends PureComponent {

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };

    handleSendMail = () => {
        const {dispatch} = this.props;
        notification.success({
            message: '正在发送，请稍等...'
        });
        dispatch(sendMail()).then(() => {
            notification.success({
                message: '发送成功，请查看邮箱'
            });
        });
    };

    handleRunLocationOnce = () => {
        const {dispatch} = this.props;
        notification.success({
            message: '正在创建任务，请稍等...'
        });
        dispatch(runOnceLocation()).then(() => {
            notification.success({
                message: '创建任务成功，请等待机器人查询...'
            });
        });
    };

    render() {
        return (
            <div className="actions">
                <Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>
                <Button onClick={this.handleSendMail}>一键推送GPS监控邮件</Button>
                <Button onClick={this.handleRunLocationOnce}>运行一次所有账号位置监控</Button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.robot.list
    };
};

export default connect(mapStateToProps)(Toolbar);
