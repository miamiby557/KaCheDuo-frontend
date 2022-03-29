import React, {PureComponent} from "react";
import {Radio} from 'antd';

class RadioSelector extends PureComponent {
    render() {
        const {
            dataSource = [],
            labelField = "label",
            valueField = "value",
            ...rest
        } = this.props;
        return (
            <Radio.Group {...rest}>
                {
                    dataSource.map(item => (<Radio value={item[valueField]}>{item[labelField]}</Radio>))
                }
            </Radio.Group>
        );
    }
}

export default RadioSelector;
