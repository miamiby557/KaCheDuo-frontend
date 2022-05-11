import React, {PureComponent} from "react";
import {Icon, Modal, Table, Tooltip, notification} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {handleScreenShotAgain, query, showPic} from "./actions";
import {getPrincipal} from "../../lib/identity";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };

    show = record => {
        const {dispatch} = this.props;
        dispatch(showPic(record));
    };

    showContent = (content) => {
        Modal.info({
            title: '详细内容',
            content: (
                <div>
                    <p>{content}</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    reScreenShot = id => {
        const {dispatch} = this.props;
        dispatch(handleScreenShotAgain(id));
        notification.success({
            message: '已经重新新建截图任务，请稍等...'
        });
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
                title: '序号',
                width: "50px",
                render:(text,record,index)=>`${index+1}`,
                fixed: "left"
            },{
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "100px"
            }, {
                title: "司机微信号",
                dataIndex: "wechat",
                width: "200px"
            }, {
                title: "司机微信ID",
                dataIndex: "wxid",
                width: "200px"
            },
            {
                title: "机器人微信号",
                dataIndex: "ownerWechat",
                width: "200px"
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
                title: "创建时间",
                dataIndex: "createTime",
                width: "180px"
            },
            {
                title: "微信截图状态",
                dataIndex: "type",
                width: "180px",
                render: (text, record) => {
                    return <span>{text}<Tooltip placement="top" title={"重新截图"}><Icon
                        onClick={() => this.reScreenShot(record.id)} type="undo"/></Tooltip></span>
                },
            },
            {
                title: "微信截图",
                dataIndex: "type",
                width: "180px",
                render: (text, record) => {
                    if (record.type === '已截图') {
                        return <a onClick={() => this.show(record)}>查看</a>
                    }
                },
            },
            {
                title: "发送内容",
                dataIndex: "content",
                width: "350px",
                render: (text, record) => (
                    <span
                        onClick={() => this.showContent(text)}>{text && text.length > 20 ? text.substring(0, 20) + "..." : text}</span>
                )
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
        ...state.screenShotTask.list
    };
};

export default connect(mapStateToProps)(List);
