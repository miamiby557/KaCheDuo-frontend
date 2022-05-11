import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification, Popconfirm} from "antd";
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
                <Popconfirm title="确定一键推送GPS监控邮件?" okText="是" cancelText="否"
                            onConfirm={() => this.handleSendMail()}>
                    <Button>一键推送GPS监控邮件</Button>
                </Popconfirm>
                <Popconfirm title="确定运行一次所有账号位置监控?" okText="是" cancelText="否"
                            onConfirm={() => this.handleRunLocationOnce()}>
                    <Button>运行一次所有账号位置监控</Button>
                </Popconfirm>
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
