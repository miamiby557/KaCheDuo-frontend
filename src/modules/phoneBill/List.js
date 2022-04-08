import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query} from "./actions";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({...filter, page, pageSize}));
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
                title: "主叫号",
                dataIndex: "caller",
                width: "80px"
            }, {
                title: "被叫号",
                dataIndex: "called",
                width: "250px"
            }, {
                title: "总呼叫时长/秒",
                dataIndex: "duration",
                width: "150px"
            }, {
                title: "通话时长/秒",
                dataIndex: "ivrTime",
                width: "150px"
            }, {
                title: "语音播报次数",
                dataIndex: "ivrCount",
                width: "150px"
            }, {
                title: "通话创建时间",
                dataIndex: "callCreateTime",
                width: "180px"
            }, {
                title: "通话开始时间",
                dataIndex: "answerTime",
                width: "180px"
            }, {
                title: "通话结束时间",
                dataIndex: "releaseTime",
                width: "180px"
            }, {
                title: "状态",
                dataIndex: "status",
                width: "180px"
            }, {
                title: "参数",
                dataIndex: "params",
                width: "180px"
            }, {
                title: "日志",
                dataIndex: "message",
                width: "280px"
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
        ...state.phoneBill.list
    };
};

export default connect(mapStateToProps)(List);
