import React, {PureComponent} from "react";
import {TimePicker} from "antd";
import moment from "moment";
import {TIME_FORMAT} from "../lib/func";

class TimerPicker extends PureComponent {
    render() {
        const {
            placeholder = "时间",
            value,
            ...rest
        } = this.props;
        const format = TIME_FORMAT;
        const selected = value && typeof value === "string" ? moment(value, format) : value;
        return (
            <TimePicker
                {...rest}
                placeholder={placeholder}
                format={format}
                value={selected}
            />
        );
    }
}

export default TimerPicker;
