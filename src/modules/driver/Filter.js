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
        if(fields.friend === "是"){
            fields.friend = true;
        }else if(fields.friend === "不是"){
            fields.friend = false;
        }
        this.setState({...fields});
        fields.owner = getPrincipal().id;
        dispatch(query({...fields,pageSize}));
    };

    render() {
        const {loading} = this.props;
        const taskTypeList = [];
        taskTypeList.push({'name': "是"});
        taskTypeList.push({'name': "不是"});
        const filterSchema = [
            {
                key: 'name',
                field: 'name',
                type: 'text',
                expandable: true,
                title: '司机姓名',
                fieldOptions:{
                    initialValue :this.state.name
                }
            },{
                key: 'vehicleNo',
                field: 'vehicleNo',
                type: 'text',
                expandable: true,
                title: '车牌号码',
                fieldOptions:{
                    initialValue :this.state.vehicleNo
                }
            },{
                key: 'company',
                field: 'company',
                type: 'text',
                expandable: true,
                title: '公司',
                fieldOptions:{
                    initialValue :this.state.company
                }
            }, {
                key: 'friend',
                field: 'friend',
                type: 'listSelector',
                expandable: true,
                title: '是否好友',
                fieldOptions: {
                    initialValue: this.state.friend
                },
                controlProps: {
                    dataSource: taskTypeList,
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
        ...state.driver.list
    };
};

export default connect(mapStateToProps)(Filter);
