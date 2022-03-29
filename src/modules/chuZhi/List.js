import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query} from "./actions";
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
                title: "创建时间",
                dataIndex: "gdCreateTime",
                width: "180px"
            },
            {
                title: "处置时间",
                dataIndex: "disposeTime",
                width: "180px"
            },
            {
                title: "所属公司",
                dataIndex: "company",
                width: "250px"
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
