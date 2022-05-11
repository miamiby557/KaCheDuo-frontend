import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";
import {getPrincipal} from "../../lib/identity";


class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        const {dispatch, pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        dispatch(query({...fields, "owner": getPrincipal().id, pageSize}));
    };

    render() {
        const {loading} = this.props;
        const filterSchema = [
            {
                key: 'company',
                field: 'company',
                type: 'text',
                expandable: true,
                title: '公司',
                fieldOptions: {
                    initialValue: this.state.company
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
        ...state.robot.list
    };
};

export default connect(mapStateToProps)(Filter);
