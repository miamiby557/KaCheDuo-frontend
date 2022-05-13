import React, {PureComponent} from "react";
import {Modal, Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {getLocationRobots, query} from "./actions";
import {getPrincipal} from "../../lib/identity";

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
                title: "SIM卡号",
                dataIndex: "sim",
                width: "120px"
            },
            {
                title: "当前驾驶员",
                dataIndex: "currentDriver",
                width: "150px"
            },
            {
                title: "业户名称",
                dataIndex: "company",
                width: "230px"
            },
            {
                title: "经营范围",
                dataIndex: "businessScope",
                width: "150px"
            },
            {
                title: "行车速度",
                dataIndex: "speed",
                width: "120px"
            },
            {
                title: "定位时间",
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
                title: "定位位置",
                dataIndex: "happenPlace",
                width: "350px",
                render: (text, record) => (
                    <span
                        onClick={() => this.showContent(text)}>{text && text.length > 20 ? text.substring(0, 20) + "..." : text}</span>
                )
            },
            {
                title: "所属帐号",
                dataIndex: "owner",
                width: "180px"
            },
            {
                title: "所属公司",
                dataIndex: "userCompany",
                width: "230px"
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                width: "180px"
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
                scroll={{x: 1500, y: 'calc(100vh - 400px)'}}
                pagination={tablePagination}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.location.list
    };
};

export default connect(mapStateToProps)(List);
