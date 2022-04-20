import React, {PureComponent} from "react";
import {Icon, Popconfirm, Table} from "antd";
import {connect} from "react-redux";
import {tableProps} from "../../lib/ui";
import {del, query} from "./actions";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(query({page, pageSize}));
    };

    handleDelete = id => {
        const {dispatch} = this.props;
        dispatch(del(id)).then(() => {
            dispatch(query());
        });
    };

    render() {
        const columns = [
            {
                title: "微信号",
                dataIndex: "phone",
                width: "150px",
            }, {
                title: '功能',
                dataIndex: '',
                key: '',
                width: "100px",
                align: 'center',
                render: (text, record) => <span>
                    <Popconfirm title="确定删除?" okText="是" cancelText="否"
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
            dataSource,
            loading
        } = this.props;
        return (
            <Table
                {...tableProps}
                columns={columns}
                scroll={{x: 1500, y: 'calc(100vh - 350px)'}}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.wechat.list
    };
};

export default connect(mapStateToProps)(List);
