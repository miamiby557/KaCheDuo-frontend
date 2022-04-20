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
                title: "微信ID",
                dataIndex: "wxid",
                width: "250px"
            },{
                title: "发送时间",
                dataIndex: "createTime",
                width: "200px"
            },
            {
                title: "内容",
                dataIndex: "content",
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
        ...state.wechatLog.list
    };
};

export default connect(mapStateToProps)(List);
