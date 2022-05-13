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
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.createTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.createTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        if (fields.disposeTimeRange && fields.disposeTimeRange.length > 1) {
            fields.disposeTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.disposeTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        delete fields.createTimeRange;
        delete fields.disposeTimeRange;
        fields.owner = getPrincipal().id;
        dispatch(query({...fields, pageSize}));
    };

    render() {
        const {loading, robots} = this.props;
        const userNameList = [];
        robots.forEach(name => userNameList.push({'name': name}));
        const statusList = [];
        statusList.push({value:'ADAS主动抓拍事件',label:'ADAS主动抓拍事件'});
        statusList.push({value:'DSM自动抓拍事件',label:'DSM自动抓拍事件'});
        statusList.push({value:'不目视前方报警',label:'不目视前方报警'});
        statusList.push({value:'超速报警',label:'超速报警'});
        statusList.push({value:'超员报警',label:'超员报警'});
        statusList.push({value:'车道偏离报警',label:'车道偏离报警'});
        statusList.push({value:'车距过近报警',label:'车距过近报警'});
        statusList.push({value:'车辆碰撞报警',label:'车辆碰撞报警'});
        statusList.push({value:'抽烟报警',label:'抽烟报警'});
        statusList.push({value:'道路标识超限报警',label:'道路标识超限报警'});
        statusList.push({value:'道路标志识别事件',label:'道路标志识别事件'});
        statusList.push({value:'红外阻断型墨镜失效报警',label:'红外阻断型墨镜失效报警'});
        statusList.push({value:'驾驶员身份识别',label:'驾驶员身份识别'});
        statusList.push({value:'接打手机报警',label:'接打手机报警'});
        statusList.push({value:'紧急报警',label:'紧急报警'});
        statusList.push({value:'偏离驾驶位报警',label:'偏离驾驶位报警'});
        statusList.push({value:'频繁变道报警',label:'频繁变道报警'});
        statusList.push({value:'设备通讯失效报警',label:'设备通讯失效报警'});
        statusList.push({value:'设备遮挡失效报警',label:'设备遮挡失效报警'});
        statusList.push({value:'生理疲劳报警',label:'生理疲劳报警'});
        statusList.push({value:'双脱把报警',label:'双脱把报警'});
        statusList.push({value:'玩手机报警',label:'玩手机报警'});
        statusList.push({value:'未系安全带报警',label:'未系安全带报警'});
        statusList.push({value:'行人碰撞报警',label:'行人碰撞报警'});
        statusList.push({value:'压实线报警',label:'压实线报警'});
        statusList.push({value:'障碍物报警',label:'障碍物报警'});
        statusList.push({value:'其他',label:'其他'});
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
            }, {
                key: 'statusList',
                field: 'statusList',
                type: 'select',
                expandable: true,
                title: '风险类型',
                fieldOptions: {
                    initialValue: this.state.statusList
                },
                controlProps: {
                    options: statusList,
                    mode: "multiple"
                }
            }, {
                key: 'userName',
                field: 'userName',
                type: 'text',
                expandable: true,
                title: '登录帐号',
                fieldOptions: {
                    initialValue: this.state.userName
                }
            }, {
                key: 'company',
                field: 'company',
                type: 'text',
                expandable: true,
                title: '公司',
                fieldOptions: {
                    initialValue: this.state.company
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
                key: 'disposeTimeRange',
                field: 'disposeTimeRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '处置日期',
                fieldOptions: {
                    initialValue: this.state.disposeTimeRange
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
        ...state.chuZhi.list,
        robots: state.location.list.robots
    };
};

export default connect(mapStateToProps)(Filter);
