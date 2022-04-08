import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";
import {DATE_FORMAT} from "../../lib/func";


class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.callTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.callTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        delete fields.createTimeRange;
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading} = this.props;
        const taskStatusList = [];
        taskStatusList.push({"name": "未拨打"});
        taskStatusList.push({"name": "已拨打"});
        taskStatusList.push({"name": "未接通"});
        taskStatusList.push({"name": "已接通"});
        const filterSchema = [
            {
                key: '1',
                field: 'phone',
                type: 'text',
                expandable: true,
                title: '被叫号',
                fieldOptions: {
                    initialValue: this.state.phone
                }
            }, {
                key: 'status',
                field: 'status',
                type: 'listSelector',
                expandable: true,
                title: '状态',
                fieldOptions: {
                    initialValue: this.state.status
                },
                controlProps: {
                    dataSource: taskStatusList,
                    labelField: "name",
                    valueField: "name"
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
            }
        ];
        return (
            <FilterForm schema={filterSchema} callback={this.handleSearch} loading={loading}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.phoneBill.list
    };
};

export default connect(mapStateToProps)(Filter);
