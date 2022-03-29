import React, {PureComponent} from "react";
import {Steps} from "antd";
import {getStatusIndex} from "../lib/func";
const Step = Steps.Step;
class StatusSteps extends PureComponent {
    render() {
        const {status,statusList} = this.props;
        const step=getStatusIndex(status,statusList);
        if(status<0){
            return(
                <Steps current={1} status="error" size="small">
                    <Step title="新建"/>
                    <Step key={status}  title="已取消"/>
                </Steps>
            )
        }else{
            return(
                <Steps current={step} size="small">
                    {statusList &&
                    statusList.map(item => (<Step key={item.value}  title={item.label}/>))}
                </Steps>
            )
        }

    }
}
export default StatusSteps;