import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";
import {getPrincipal} from "../../lib/identity";



class Filter extends PureComponent {
    state={};
    handleSearch = (values) => {
        const {dispatch,pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        fields.owner = getPrincipal().id;
        dispatch(query({...fields,pageSize}));
    };

    render() {
        const {loading} = this.props;
        const filterSchema = [
            {
                key: '1',
                field: 'name',
                type: 'text',
                expandable: true,
                title: '司机姓名',
                fieldOptions:{
                    initialValue :this.state.name
                }
            },{
                key: '2',
                field: 'vehicleNo',
                type: 'text',
                expandable: true,
                title: '车牌号码',
                fieldOptions:{
                    initialValue :this.state.vehicleNo
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
        ...state.driver.list
    };
};

export default connect(mapStateToProps)(Filter);
