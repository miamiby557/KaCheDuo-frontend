import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {tableProps} from "../../lib/ui";
import {query} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id, "queryRunning": true}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };

    render() {
        const {
            dataSource,
            loading,
        } = this.props;
        const columns = [
            {
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "150px"
            }, {
                title: "司机微信号",
                dataIndex: "wechat",
                width: "250px"
            },
            {
                title: "机器人微信号",
                dataIndex: "ownerWechat",
                width: "150px"
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                width: "180px"
            },
            {
                title: "截图状态",
                dataIndex: "type",
                width: "180px"
            },
            {
                title: "截图日志",
                dataIndex: "message",
                width: "180px"
            },
            {
                title: "发送内容",
                dataIndex: "content",
            }
        ];


        return (
            <Table
                {...tableProps}
                columns={columns}
                scroll={{x: 1500, y: 'calc(100vh - 350px)'}}
                dataSource={dataSource}
                pagination={{pageSize: 20}}//自定义每页显示的数据条数
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.screenShotTaskRunning.list
    };
};

export default connect(mapStateToProps)(List);
