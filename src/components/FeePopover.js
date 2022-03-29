import React, {PureComponent} from 'react';
import {Divider, InputNumber, Popover, Select} from 'antd';

const {Option} = Select;

class FeePopover extends PureComponent {
    state = {"feeCount": '', "currency": ""};

    onChange = value => {
        this.setState({"feeCount": value});
    };
    handleChange = value => {
        this.setState({"currency": value});
    };

    save = (rowId, title) => {
        const {onSave, feeCount, currency} = this.props;
        let value1 = '';
        if (this.state.feeCount.toString().length === 0) {
            value1 = feeCount;
        } else {
            value1 = this.state.feeCount;
        }
        let value2 = '';
        if (this.state.currency.toString().length === 0) {
            value2 = currency;
        } else {
            value2 = this.state.currency;
        }
        onSave(rowId, title, value1, value2);
    };

    render() {
        const {
            rowId,
            text,
            title,
            feeCount = 0,
            currencyList = [],
            valueKey,
            currency = "",
            onSave,
            lockText = "",
            lockFunc,
            canShow,
            ...rest
        } = this.props;
        const content = (<div>
            {/*<InputNumber defaultValue={feeCount} onChange={this.onChange}/>
            <Divider/>
            <Select defaultValue={currency} style={{width: 120}} onChange={this.handleChange}>
                {currencyList.map(item => (
                    <Option value={item[valueKey]} key={item[valueKey]}>
                        {item[valueKey]}
                    </Option>
                ))}
            </Select>
            <Divider/>*/}
            <div>
                {/*<a onClick={() => this.save(rowId, title)}>保存</a>
                <Divider type="vertical"/>*/}
                <span>{text}</span>
                <Divider/>
                {canShow &&
                <a onClick={() => lockFunc(rowId, title, lockText)}>{lockText}</a>}
            </div>
        </div>);
        return (
            <Popover content={content} placement="right" {...rest}>
                <span>{text}</span>
            </Popover>
        );
    };
}

export default FeePopover;
