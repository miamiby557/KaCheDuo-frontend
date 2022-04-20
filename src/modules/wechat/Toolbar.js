import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification} from "antd";
import {showCreate, sync} from "./actions";

class Toolbar extends PureComponent {

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };

    handleSync = () => {
        const {dispatch, dataSource} = this.props;
        dataSource.forEach(item => {
            dispatch(sync(item.no));
        });
        notification.success({
            message: '已经发送同步命令，请稍等...'
        });
    };

    render() {
        return (
            <div className="actions">
                <Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>
                <Button onClick={this.handleSync}>同步微信好友状态</Button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.wechat.list
    };
};

export default connect(mapStateToProps)(Toolbar);
