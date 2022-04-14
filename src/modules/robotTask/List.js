import React, {PureComponent} from "react";
import {Icon, notification, Table, Tooltip} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {handleAgain, query} from "./actions";
import {getPrincipal} from "../../lib/identity";
import {showPic} from "./actions";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };


    reHandle = id => {
        const {dispatch} = this.props;
        dispatch(handleAgain(id));
        notification.success({
            message: '已经重新生成处理任务，请稍等...'
        });
    };

    show = record => {
        const {dispatch} = this.props;
        dispatch(showPic(record));
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
                title: "微信截图",
                dataIndex: "type",
                width: "180px",
                render: (text, record) => {
                    if (record.filePath) {
                        return <a onClick={() => this.show(record)}>查看</a>
                    }
                },
            },
            {
                title: "任务状态",
                dataIndex: "taskStatus",
                width: "150px",
                render: (text, record) => {
                    if (record.taskType === '处理-位置监控' && record.taskStatus === '运行失败') {
                        return <span>{text}<Tooltip placement="top" title={"重新处理"}><Icon
                            onClick={() => this.reHandle(record.id)} type="undo"/></Tooltip></span>
                    } else {
                        return text;
                    }
                }
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
