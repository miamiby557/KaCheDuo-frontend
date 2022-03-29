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
        if (fields.happenTime) {
            fields.happenTime = fields.happenTime.format(DATE_FORMAT);
        }
        delete fields.createTimeRange;
        fields.owner = getPrincipal().id;
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading} = this.props;
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
                key: 'happenTime',
                field: 'happenTime',
                type: 'date',
                expandable: true,
                title: '发生日期',
                fieldOptions: {
                    initialValue: this.state.happenTime
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
        ...state.chuZhi.list
    };
};

export default connect(mapStateToProps)(Filter);
