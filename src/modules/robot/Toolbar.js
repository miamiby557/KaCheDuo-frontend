import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification} from "antd";
import {sendMail, showCreate} from "./actions";

class Toolbar extends PureComponent {

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };

    handleSendMail = () => {
        const {dispatch} = this.props;
        dispatch(sendMail()).then(() => {
            notification.success({
                message: '发送成功，请查看邮箱'
            });
        });
    };

    render() {
        return (
            <div className="actions">
                <Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>
                <Button onClick={this.handleSendMail}>一键推送GPS监控邮件</Button>
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
