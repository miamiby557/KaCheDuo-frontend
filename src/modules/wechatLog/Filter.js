import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";
import {DATE_FORMAT} from "../../lib/func";
import {notification} from "antd";


class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.createTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.createTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        delete fields.createTimeRange;
        if (fields.content !== undefined && fields.content !== null && fields.content.length > 0) {
            // 必须选择时间范围
            if (fields.createTimeStart === undefined || fields.createTimeStart === null || fields.createTimeEnd === undefined || fields.createTimeEnd === null) {
                notification.error({
                    message: '查询包含文字必须选择时间范围'
                });
                return;
            }
        }
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading} = this.props;
        const filterSchema = [
            {
                key: 'wechat',
                field: 'wechat',
                type: 'text',
                expandable: true,
                title: '微信号',
                fieldOptions: {
                    initialValue: this.state.wechat
                }
            },{
                key: 'wxid',
                field: 'wxid',
                type: 'text',
                expandable: true,
                title: '微信ID',
                fieldOptions: {
                    initialValue: this.state.wxid
                }
            }, {
                key: 'createTimeRange',
                field: 'createTimeRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '创建日期',
                fieldOptions: {
                    initialValue: this.state.createTimeRange
                }
            }, {
                key: 'content',
                field: 'content',
                type: 'text',
                expandable: true,
                title: '包含文字',
                fieldOptions: {
                    initialValue: this.state.content
                }
            }
        ];
        return (
            <FilterForm schema={filterSchema} callback={this.handleSearch} loading={loading}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.wechatLog.list
    };
};

export default connect(mapStateToProps)(Filter);
