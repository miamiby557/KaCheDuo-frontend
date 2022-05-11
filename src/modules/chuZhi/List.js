import React, {PureComponent} from "react";
import {Modal, Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query} from "./actions";
import {getPrincipal} from "../../lib/identity";
import {getLocationRobots} from "../location/actions";
import {showPic} from "./actions";

class List extends PureComponent {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
        dispatch(getLocationRobots(getPrincipal().id));
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
                title: '序号',
                width: "50px",
                render:(text,record,index)=>`${index+1}`,
                fixed: "left"
            },{
                title: "车牌号码",
                dataIndex: "vehicleNo",
                width: "150px"
            },
            {
                title: "车牌颜色",
                dataIndex: "vehicleColor",
                width: "150px"
            },
            {
                title: "所属地区",
                dataIndex: "area",
                width: "150px"
            },
            {
                title: "第三方监控机构",
                dataIndex: "thirdOrg",
                width: "150px"
            },
            {
                title: "当前驾驶员",
                dataIndex: "currentDriver",
                width: "150px"
            },
            {
                title: "经营范围",
                dataIndex: "businessScope",
                width: "150px"
            },
            {
                title: "风险类型",
                dataIndex: "dangerType",
                width: "140px"
            },
            {
                title: "风险等级",
                dataIndex: "dangerLevel",
                width: "80px"
            },
            {
                title: "行车速度km/h",
                dataIndex: "speed",
                width: "120px"
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
                title: "发生位置",
                dataIndex: "happenPlace",
                width: "350px",
                render: (text, record) => (
                    <span
                        onClick={() => this.showContent(text)}>{text && text.length > 20 ? text.substring(0, 20) + "..." : text}</span>
                )
            },
            {
                title: "创建时间",
                dataIndex: "gdCreateTime",
                width: "180px"
            },
            {
                title: "处置时间",
                dataIndex: "disposeTime",
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
                title: "微信通知时间",
                dataIndex: "messageSendTime",
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
                title: "微信回复时间",
                dataIndex: "messageReceiveTime",
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
                title: "处理时间",
                dataIndex: "chuLiTime",
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
                title: "外呼时间",
                dataIndex: "callTime",
                width: "200px",
                render: (text) => {
                    if (text && text.length > 19) {
                        return text.substring(0, 19);
                    } else {
                        return text;
                    }
                }
            },
            {
                title: "是否接通",
                dataIndex: "called",
                width: "250px"
            },
            {
                title: "接通时间",
                dataIndex: "hangUpTime",
                width: "200px",
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
            },
            {
                title: "接通时长",
                dataIndex: "seconds",
                width: "120px"
            },
            {
                title: "登录账号",
                dataIndex: "owner",
                width: "250px"
            },
            {
                title: "所属公司",
                dataIndex: "company",
                width: "250px",
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
        ...state.chuZhi.list
    };
};

export default connect(mapStateToProps)(List);
