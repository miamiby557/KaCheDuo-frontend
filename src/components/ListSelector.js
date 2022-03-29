import React, {PureComponent} from "react";
import {Select} from "antd";

const Option = Select.Option;

const filter = (input, option) => {
    return option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        option.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;

}

class ListSelector extends PureComponent {
    render() {
        const {
            dataSource = [],
            labelField = "label",
            valueField = "value",
            ...rest
        } = this.props;
        return (
            <Select
                {...rest}
                style={{width: 180}}
                allowClear={true}
                showSearch
                filterOption={filter}
            >
                {dataSource &&
                dataSource.map(item => (
                    <Option value={item[valueField]} key={item[labelField]}>
                        {item[labelField]}
                    </Option>
                ))}
            </Select>
        );
    }
}

export default ListSelector;
