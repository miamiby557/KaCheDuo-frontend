import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };

    render() {
        const {
            page,
            pageSize,
            totalElements,
            dataSource,
            loading,
        } = this.props;
        const columns = [
            {
                title: "登录帐号",
                dataIndex: "userName",
                width: "150px"
            },{
                title: "所属公司",
                dataIndex: "company",
                width: "250px"
            },
            {
                title: "任务类型",
                dataIndex: "taskType",
                width: "150px"
            },
            {
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "150px"
            },
            {
                title: "发生时间",
                dataIndex: "happenTime",
                width: "180px",
                render: (text) => {
                    if (text && text.length > 19) {
                        return text.substring(0, 19);
                    } else {
                        return text;
                    }
                }
            },
            {
                title: "任务状态",
                dataIndex: "taskStatus",
                width: "150px"
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                width: "180px"
            },
            {
                title: "完成时间",
                dataIndex: "finishTime",
                width: "180px"
            }, {
                title: "操作日志",
                dataIndex: "message",
            }
        ];

        const tablePagination = {
            ...paginationProps,
            total: totalElements,
            current: page,
            pageSize: pageSize,
            onShowSizeChange: (current, newSize) =>
                this.onPageChange && this.onPageChange(1, newSize),
            onChange: this.onPageChange
        };

        return (
            <Table
                {...tableProps}
                columns={columns}
                scroll={{x: 1500, y: 'calc(100vh - 350px)'}}
                pagination={tablePagination}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.robotTask.list
    };
};

export default connect(mapStateToProps)(List);
