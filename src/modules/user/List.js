import React, {PureComponent} from "react";
import {Icon, Popconfirm, Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {del, query} from "./actions";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({filter, page, pageSize}));
    };

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(query({page, pageSize}));
    };

    handleDelete = id => {
        const {dispatch, filter, page, pageSize} = this.props;
        dispatch(del(id)).then(() => {
            dispatch(query({filter, page, pageSize}));
        });
    };

    render() {
        const columns = [
            {
                title: "系统登录帐号",
                dataIndex: "account",
                width: "150px",
            }, {
                title: "密码",
                dataIndex: "password",
                width: "150px"
            }, {
                title: "公司名称",
                dataIndex: "company",
                width: "200px"
            }, {
                title: "微信号",
                dataIndex: "wechat",
                width: "180px"
            }, {
                title: '功能',
                dataIndex: '',
                key: '',
                width: "100px",
                align: 'center',
                render: (text, record) => <span>
                    <Popconfirm title="确定删除，此用户的帐号也会一并删除?" okText="是" cancelText="否"
                                onConfirm={() => this.handleDelete(record.id)}>
                        <Icon type="delete"/>
                    </Popconfirm>
                </span>,
            }, {
                title: "",
                dataIndex: ""
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
                scroll={{x: 1500, y: 'calc(100vh - 350px)'}}
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
