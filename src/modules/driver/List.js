import React, {PureComponent} from "react";
import {Icon, Popconfirm, Table} from "antd";
import {connect} from "react-redux";
import {tableProps} from "../../lib/ui";
import {del, query} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {


    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
    };

    handleDelete = id => {
        const {dispatch, filter} = this.props;
        dispatch(del(id)).then(() => {
            dispatch(query({...filter}));
        });
    };

    render() {
        const columns = [
            {
                title: "司机姓名",
                dataIndex: "name",
                width: "150px",
            }, {
                title: "联系电话",
                dataIndex: "phone",
                width: "150px"
            }, {
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "150px"
            }, {
                title: "公司名称",
                dataIndex: "company",
                width: "250px"
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
        ...state.driver.list
    };
};

export default connect(mapStateToProps)(List);
