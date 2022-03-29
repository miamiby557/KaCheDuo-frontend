import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query, select} from "./actions";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({filter, page, pageSize}));
    };

    handleSelectChange = (selectedRowKeys) => {
        const {dispatch} = this.props;
        dispatch(select(selectedRowKeys));
    };

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(query({page, pageSize}));
    };

    render() {
        const columns = [
            {
                title: "用户名",
                dataIndex: "account",
                width: "90px",
            }, {
                title: "姓名",
                dataIndex: "name",
                width: "90px"
            }, {
                title: "邮箱",
                dataIndex: "email",
                width: "180px"
            }
        ];
        const {
            selectedRowKeys,
            page,
            pageSize,
            totalElements,
            dataSource,
            loading
        } = this.props;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectChange
        };

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
                pagination={tablePagination}
                rowSelection={rowSelection}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.user.list
    };
};

export default connect(mapStateToProps)(List);
