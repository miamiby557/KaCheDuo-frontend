import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, Popconfirm} from "antd";
import {del, query, showCreate} from "./actions";

class Toolbar extends PureComponent {

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };
    handleDelete = () => {
        const {dispatch, selectedRowKeys} = this.props;
        dispatch(del(selectedRowKeys[0])).then(() => {
            dispatch(query({}));
        });
    };

    render() {
        return (
            <div className="actions">
                <Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.user.list
    };
};

export default connect(mapStateToProps)(Toolbar);
