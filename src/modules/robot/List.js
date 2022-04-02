import React, {PureComponent} from "react";
import {Divider, Icon, Popconfirm, Table, Tooltip} from "antd";
import {connect} from "react-redux";
import {tableProps} from "../../lib/ui";
import {del, query, showUpdate, start, stop, updateDataSource, updateSubRobot} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query(getPrincipal().id));
    };

    handleDelete = id => {
        const {dispatch} = this.props;
        dispatch(del(id)).then(() => {
            dispatch(query(getPrincipal().id));
        });
    };

    handleShowEdit = row => {
        const {dispatch} = this.props;
        dispatch(showUpdate(row));
        dispatch(updateSubRobot(row.subRobots));
    };

    handleStart = id => {
        const {dispatch} = this.props;
        dispatch(start(id)).then(() => {
            dispatch(query(getPrincipal().id));
        });
    };

    handleStop = id => {
        const {dispatch} = this.props;
        dispatch(stop(id)).then(() => {
            dispatch(query(getPrincipal().id));
        });
    };

    hidePWD = (id, key, value) => {
        const {dispatch, dataSource} = this.props;
        const found = dataSource.find(item => item.id === id);
        if (found) {
            found[key] = value;
        }
        dispatch(updateDataSource([...dataSource]));
    };

    hidePWD2 = (id, dataId, key, value) => {
        const {dispatch, dataSource} = this.props;
        const found = dataSource.find(item => item.id === id);
        if (found && found.subRobots && found.subRobots.length > 0) {
            found.subRobots.forEach(data => {
                if (data.id === dataId) {
                    data[key] = value;
                }
            });
        }
        dispatch(updateDataSource([...dataSource]));
    };

    render() {
        const expandedRowRender = (record, index, indent, expanded) => {
            const columns = [
                {
                    title: "处置帐号",
                    dataIndex: "phone",
                    width: "150px",
                }, {
                    title: "处置密码",
                    dataIndex: "pwd",
                    width: "150px",
                    render: (text, data) => {
                        if (data.show1) {
                            return <span>{text}<Icon onClick={() => this.hidePWD2(record.id, data.id, 'show1', false)}
                                                     type="eye-invisible"/></span>
                        } else {
                            return <span>******<Icon onClick={() => this.hidePWD2(record.id, data.id, 'show1', true)}
                                                     type="eye"/></span>
                        }
                    }
                }, {
                    title: "状态",
                    dataIndex: "run",
                    width: "180px",
                    render: (text) => {
                        if (text) {
                            return "正常";
                        } else {
                            return "禁用";
                        }
                    }
                }, {
                    title: "存活状态",
                    dataIndex: "alive",
                    width: "180px",
                    render: (text) => {
                        if (text) {
                            return "在线";
                        } else {
                            return "下线";
                        }
                    }
                }, {
                    title: "上次在线时间",
                    dataIndex: "lastTime",
                    width: "180px"
                }, {
                    title: '功能',
                    dataIndex: '',
                    key: '',
                    width: "180px",
                    align: 'center',
                    render: (text, record) => <span>
                    <Tooltip placement="top" title={'启用'}><Icon onClick={() => this.handleStart(record.id)}
                                                                type="redo"/></Tooltip>
                    <Divider type="vertical"/>
                    <Popconfirm title="确定停止?" okText="是" cancelText="否"
                                onConfirm={() => this.handleStop(record.id)}>
                        <Tooltip placement="top" title={'禁用'}><Icon type="stop"/></Tooltip>
                    </Popconfirm>
                </span>,
                }, {
                    title: "",
                    dataIndex: ""
                }
            ];
            return <Table columns={columns} dataSource={record.subRobots} pagination={false}/>;
        }
        const columns = [
            {
                title: "监控帐号",
                dataIndex: "phone",
                width: "150px",
                render: (text, record) => (
                    <a
                        onClick={() => {
                            this.handleShowEdit(record);
                        }}
                    >
                        {text}
                    </a>
                )
            }, {
                title: "监控密码",
                dataIndex: "pwd",
                width: "150px",
                render: (text, record) => {
                    if (record.show1) {
                        return <span>{text}<Icon onClick={() => this.hidePWD(record.id, 'show1', false)}
                                                 type="eye-invisible"/></span>
                    } else {
                        return <span>******<Icon onClick={() => this.hidePWD(record.id, 'show1', true)}
                                                 type="eye"/></span>
                    }
                }
            }, {
                title: "(处理、位置)帐号",
                dataIndex: "account2",
                width: "150px"
            }, {
                title: "(处理、位置)密码",
                dataIndex: "pwd2",
                width: "150px",
                render: (text, record) => {
                    if (record.show2) {
                        return <span>{text}<Icon onClick={() => this.hidePWD(record.id, 'show2', false)}
                                                 type="eye-invisible"/></span>
                    } else {
                        return <span>******<Icon onClick={() => this.hidePWD(record.id, 'show2', true)}
                                                 type="eye"/></span>
                    }
                }
            }, {
                title: "所属公司",
                dataIndex: "company",
                width: "250px"
            }, {
                title: "状态",
                dataIndex: "run",
                width: "180px",
                render: (text) => {
                    if (text) {
                        return "正常";
                    } else {
                        return "禁用";
                    }
                }
            }, {
                title: "存活状态",
                dataIndex: "alive",
                width: "180px",
                render: (text) => {
                    if (text) {
                        return "在线";
                    } else {
                        return "下线";
                    }
                }
            }, {
                title: "上次在线时间",
                dataIndex: "lastTime",
                width: "180px"
            }, {
                title: '功能',
                dataIndex: '',
                key: '',
                width: "180px",
                align: 'center',
                render: (text, record) => <span>
                    <Tooltip placement="top" title={'启用'}><Icon onClick={() => this.handleStart(record.id)}
                                                                type="redo"/></Tooltip>
                    <Divider type="vertical"/>
                    <Popconfirm title="确定停止，子账号也会一起停止?" okText="是" cancelText="否"
                                onConfirm={() => this.handleStop(record.id)}>
                        <Tooltip placement="top" title={'禁用'}><Icon type="stop"/></Tooltip>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <Popconfirm title="确定删除，子账号也会一起删除?" okText="是" cancelText="否"
                                onConfirm={() => this.handleDelete(record.id)}>
                        <Tooltip placement="top" title={'删除'}><Icon type="delete"/></Tooltip>
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
                expandedRowRender={expandedRowRender}
                dataSource={dataSource}
                pagination={{pageSize: 20}}//自定义每页显示的数据条数
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.robot.list
    };
};

export default connect(mapStateToProps)(List);
