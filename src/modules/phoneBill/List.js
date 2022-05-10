import React, {PureComponent} from "react";
import {Modal, Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query} from "./actions";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({}));
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({...filter, page, pageSize}));
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
                title: "主叫号",
                dataIndex: "caller",
                width: "180px"
            }, {
                title: "被叫号",
                dataIndex: "called",
                width: "180px"
            }, {
                title: "车牌号",
                dataIndex: "vehicleNo",
                width: "180px"
            }, {
                title: "登录帐号",
                dataIndex: "account",
                width: "180px"
            },
            {
                title: "所属公司",
                dataIndex: "company",
                width: "250px",
                render: (text, record) => (
                    <span
                        onClick={() => this.showContent(text)}>{text && text.length > 20 ? text.substring(0, 20) + "..." : text}</span>
                )
            }, {
                title: "总呼叫时长/秒",
                dataIndex: "duration",
                width: "150px"
            }, {
                title: "通话时长/秒",
                dataIndex: "ivrTime",
                width: "150px"
            }, {
                title: "语音播报次数",
                dataIndex: "ivrCount",
                width: "150px"
            }, {
                title: "通话创建时间",
                dataIndex: "callCreateTime",
                width: "180px"
            }, {
                title: "通话开始时间",
                dataIndex: "answerTime",
                width: "180px",
                render: (text, record) => {
                    if(text && text.indexOf("1970-01-01")){
                        return "";
                    }
                    if (text && text.length > 19) {
                        return text.substring(0, 19);
                    } else {
                        return text;
                    }
                }
            }, {
                title: "通话结束时间",
                dataIndex: "releaseTime",
                width: "180px"
            }, {
                title: "状态",
                dataIndex: "status",
                width: "180px"
            }, {
                title: "成本/元",
                dataIndex: "cost",
                width: "180px"
            }, {
                title: "参数",
                dataIndex: "params",
                width: "180px"
            }, {
                title: "日志",
                dataIndex: "message",
                width: "280px"
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
        ...state.phoneBill.list
    };
};

export default connect(mapStateToProps)(List);
