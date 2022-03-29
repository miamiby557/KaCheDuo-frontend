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
        if (fields.happenTimeRange && fields.happenTimeRange.length > 1) {
            fields.happenTimeStart = fields.happenTimeRange[0].format(DATE_FORMAT);
            fields.happenTimeEnd = fields.happenTimeRange[1].format(DATE_FORMAT);
        }
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.createTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.createTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        delete fields.happenTimeRange;
        delete fields.createTimeRange;
        fields.owner = getPrincipal().id;
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading, robots} = this.props;
        const userNameList = [];
        robots.forEach(name=>userNameList.push({'name': name}));
        const filterSchema = [
            {
                key: 'vehicleNo',
                field: 'vehicleNo',
                type: 'text',
                expandable: true,
                title: '车牌号码',
                fieldOptions: {
                    initialValue: this.state.vehicleNo
                }
            }, {
                key: 'happenTimeRange',
                field: 'happenTimeRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '发生日期',
                fieldOptions: {
                    initialValue: this.state.happenTimeRange
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
                key: 'userName',
                field: 'userName',
                type: 'listSelector',
                expandable: true,
                title: '登录帐号',
                fieldOptions: {
                    initialValue: this.state.userName
                },
                controlProps: {
                    dataSource: userNameList,
                    labelField: "name",
                    valueField: "name"
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
        ...state.location.list
    };
};

export default connect(mapStateToProps)(Filter);
