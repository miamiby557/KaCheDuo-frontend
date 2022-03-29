import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query} from "./actions";
import FilterForm from "../../components/FilterForm";



class Filter extends PureComponent {
    state={};
    handleSearch = (values) => {
        const {dispatch,pageSize} = this.props;
        let fields = values;
        this.setState({...fields});
        dispatch(query({...fields,pageSize}));
    };

    render() {
        const {loading} = this.props;
        const filterSchema = [
            {
                key: '1',
                field: 'account',
                type: 'text',
                expandable: true,
                title: '用户名',
                fieldOptions:{
                    initialValue :this.state.account
                }
            },
            {
                key: '2',
                field: 'name',
                type: 'text',
                expandable: true,
                title: '姓名',
                fieldOptions:{
                    initialValue :this.state.name
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
        ...state.user.list
    };
};

export default connect(mapStateToProps)(Filter);
