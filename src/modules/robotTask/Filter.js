import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";
import {getPrincipal} from "../../lib/identity";
import {DATE_FORMAT} from "../../lib/func";


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
        fields.owner = getPrincipal().id;
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading} = this.props;
        const taskTypeList = [];
        taskTypeList.push({'name': "处置"});
        taskTypeList.push({'name': "处理"});
        taskTypeList.push({'name': "位置监控"});
        const taskStatusList = [];
        taskStatusList.push({"name": "已完成"});
        taskStatusList.push({"name": "运行失败"});
        const filterSchema = [
            {
                key: '1',
                field: 'userName',
                type: 'text',
                expandable: true,
                title: '登录帐号',
                fieldOptions: {
                    initialValue: this.state.userName
                }
            }, {
                key: 'taskType',
                field: 'taskType',
                type: 'listSelector',
                expandable: true,
                title: '任务类型',
                fieldOptions: {
                    initialValue: this.state.taskType
                },
                controlProps: {
                    dataSource: taskTypeList,
                    labelField: "name",
                    valueField: "name"
                }
            }, {
                key: 'taskStatus',
                field: 'taskStatus',
                type: 'listSelector',
                expandable: true,
                title: '任务状态',
                fieldOptions: {
                    initialValue: this.state.taskStatus
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
        ...state.robotTask.list
    };
};

export default connect(mapStateToProps)(Filter);
