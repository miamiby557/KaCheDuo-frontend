import React, {PureComponent} from "react";
import {Divider, Icon, notification, Popconfirm, Table, Tooltip} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {
    del,
    query, sendMailOnceCompany,
    showUpdate,
    start,
    startLocation,
    stop,
    stopLocation,
    updateDataSource,
    updateSubRobot
} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({'owner': getPrincipal().id}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };

    handleDelete = id => {
        notification.info({
            message: '正在删除'
        });
        const {dispatch} = this.props;
        dispatch(del(id)).then(() => {
            notification.success({
                message: '删除成功'
            });
            dispatch(query({'owner': getPrincipal().id}));
        });
    };

    handleShowEdit = row => {
        const {dispatch} = this.props;
        dispatch(showUpdate(row));
        dispatch(updateSubRobot(row.subRobots));
    };

    handleStart = id => {
        notification.info({
            message: '正在启动'
        });
        const {dispatch} = this.props;
        dispatch(start(id)).then(() => {
            notification.success({
                message: '启动成功'
            });
            dispatch(query({'owner': getPrincipal().id}));
        });
    };

    handleStop = id => {
        notification.info({
            message: '正在停止'
        });
        const {dispatch} = this.props;
        dispatch(stop(id)).then(() => {
            notification.success({
                message: '停止成功'
            });
            dispatch(query({'owner': getPrincipal().id}));
        });
    };


    sendEmail = id => {
        notification.info({
            message: '正在发送'
        });
        const {dispatch} = this.props;
        dispatch(sendMailOnceCompany(id)).then(() => {
            notification.success({
                message: '发送成功，请等待接收邮件'
            });
        });
    };

    handleStopLocation = id => {
        notification.info({
            message: '正在停止'
        });
        const {dispatch} = this.props;
        dispatch(stopLocation(id)).then(() => {
            notification.success({
                message: '停止成功'
            });
            dispatch(query({'owner': getPrincipal().id}));
        });
    };

    handleStartLocation = id => {
        notification.info({
            message: '正在启动'
        });
        const {dispatch} = this.props;
        dispatch(startLocation(id)).then(() => {
            notification.success({
                message: '启动成功'
            });
            dispatch(query({'owner': getPrincipal().id}));
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
                    width: "200px",
                    render: (text, record) => {
                        return <span>
                        {text}{record.run ? "(启用)" : "(禁用)"}
                    </span>
                    }
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
                    title: "存活状态",
                    dataIndex: "alive",
                    width: "100px",
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
                        {record.run ? <Popconfirm title="确定停止处置?" okText="是" cancelText="否"
                                                  onConfirm={() => this.handleStop(record.id)}>
                            <Tooltip placement="top" title={'禁用'}><a>停止处置</a></Tooltip>
                        </Popconfirm> : <a onClick={() => this.handleStart(record.id)}
                                           type="redo">启动处置</a>}
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
                title: "所属公司",
                dataIndex: "company",
                width: "250px",
                render: (text, record) => {
                    return <span>{text + " "}<Icon onClick={() => this.sendEmail(record.id)}
                                                   type="mail"/></span>
                }
            }, {
                title: "监控帐号",
                dataIndex: "phone",
                width: "200px",
                render: (text, record) => {
                    return <span>
                        <a
                            onClick={() => {
                                this.handleShowEdit(record);
                            }}
                        >
                        {text}
                    </a>{record.run ? "(启用)" : "(禁用)"}
                    </span>
                }
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
                width: "200px",
                render: (text, record) => {
                    return <span>
                        {text}{record.run2 ? "(启用)" : "(禁用)"}
                    </span>
                }
            }, {
                title: "(处理、位置)密码",
                dataIndex: "pwd2",
                width: "200px",
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
                title: "存活状态",
                dataIndex: "alive",
                width: "80px",
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
                width: "380px",
                align: 'center',
                render: (text, record) => <span>
                    {record.run ? <Popconfirm title="确定停止，子账号也会一起停止?" okText="是" cancelText="否"
                                              onConfirm={() => this.handleStop(record.id)}>
                        <a>停止监控</a>
                    </Popconfirm> : <a onClick={() => this.handleStart(record.id)}>启用监控</a>}
                    <Divider type="vertical"/>
                    {record.run2 ? <Popconfirm title="确定停止处理?" okText="是" cancelText="否"
                                               onConfirm={() => this.handleStop(record.id2)}>
                        <a>停止处理</a>
                    </Popconfirm> : <a onClick={() => this.handleStart(record.id2)}>启用处理</a>}
                    <Divider type="vertical"/>
                    {record.runLocation ? <Popconfirm title="确定停止位置查询?" okText="是" cancelText="否"
                                                      onConfirm={() => this.handleStopLocation(record.id2)}>
                        <a>停止位置查询</a>
                    </Popconfirm> : <a onClick={() => this.handleStartLocation(record.id2)}>启用位置查询</a>}
                    <Divider type="vertical"/>
                    <Popconfirm title="确定删除，子账号也会一起删除?" okText="是" cancelText="否"
                                onConfirm={() => this.handleDelete(record.id)}>
                        <Tooltip placement="top" title={'删除'}><a>删除</a></Tooltip>
                    </Popconfirm>
                </span>,
            }, {
                title: "",
                dataIndex: ""
            }
        ];
        const {
            page,
            pageSize,
            totalElements,
            dataSource,
            loading,
        } = this.props;

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
                expandedRowRender={expandedRowRender}
                dataSource={dataSource}
                pagination={tablePagination}
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
