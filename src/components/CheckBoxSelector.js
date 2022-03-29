import React, {PureComponent} from "react";
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

class CheckBoxSelector extends PureComponent {
    render() {
        const {
            dataSource = [],
            labelField = "label",
            valueField = "value",
            ...rest
        } = this.props;
        const options = dataSource.map(item => ({label:item[labelField], value: item[valueField]}));
        return (
            <CheckboxGroup options={options} {...rest}/>
        );
    }
}

export default CheckBoxSelector;
