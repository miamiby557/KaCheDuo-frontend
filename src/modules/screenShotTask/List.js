import React, {PureComponent} from "react";
import {Modal, Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query, showPic} from "./actions";
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
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "150px"
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
                width: "180px"
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
                width: "300px",
                render: (text, record) => (
                    <span
                        onClick={() => this.showContent(text)}>{text && text.length > 20 ? text.substring(0, 20)+"..." : text}</span>
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
