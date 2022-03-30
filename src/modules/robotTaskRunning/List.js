import React, {PureComponent} from "react";
import {Icon, Table, Tooltip} from "antd";
import {connect} from "react-redux";
import {tableProps} from "../../lib/ui";
import {query, reRun} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id, "queryRunning": true}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize, "queryRunning": true}));
    };

    onChangeStatus = id => {
        const {dispatch} = this.props;
        dispatch(reRun(id)).then(() => {
            dispatch(query({"owner": getPrincipal().id, "queryRunning": true}));
        });
    };

    render() {
        const {
            dataSource,
            loading,
        } = this.props;
        const columns = [
            {
                title: "登录帐号",
                dataIndex: "userName",
                width: "150px"
            }, {
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
                title: "任务状态",
                dataIndex: "taskStatus",
                width: "150px",
                render: (text, record) => {
                    if (text === "运行中") {
                        return <span>{text}<Tooltip placement="top" title={"重新运行"}><Icon
                            onClick={() => this.onChangeStatus(record.id)} type="undo"/></Tooltip></span>
                    } else {
                        return text;
                    }
                }
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                width: "180px"
            }, {
                title: "操作日志",
                dataIndex: "message",
            }
        ];


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
        ...state.robotTaskRunning.list
    };
};

export default connect(mapStateToProps)(List);
