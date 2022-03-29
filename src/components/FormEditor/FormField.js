import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {merge} from 'lodash';
import {AutoComplete, DatePicker, Form, Input, InputNumber, Select, Slider, Switch} from 'antd';
import DistrictSelector from '.././DistrictSelector';
import ListSelector from '.././ListSelector';
import DateTimePicker from '.././DateTimePicker';
import {getDistrictLabel, treeToList} from '../../lib/func';
import CheckBoxSelector from "../CheckBoxSelector";
import RadioSelector from "../RadioSelector";
import AddressInfo from "../AddressInfo";
import TreeSelector from "../TreeSelector";

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const DateRangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;

const DATE_FORMAT = 'YYYY-MM-DD';
const MONTH_FORMAT = 'YYYY-MM';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

const filterOption = (inputValue, option) => {
    return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
}

const getFieldControl = ({
                             field,
                             type,
                             title,
                             placeholder,
                             controlProps = {},
                             readonly,
                             getFieldValue
                         }) => {
    switch (type) {
        case 'number':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <InputNumber {...controlProps} min={0} placeholder={placeholder || title}/>;
        case 'formatNumber':
            if (readonly === true) {
                const text = getFieldValue(field);
                const showText = parseFloat(text).toFixed(2);
                return <span color={text < 0 ? 'red' : ''} className="ant-form-text">{showText}</span>;
            }
            const {
                formatter, parser
            } = controlProps;
            return <InputNumber formatter={formatter} parser={parser} {...controlProps}
                                placeholder={placeholder || title}/>;
        case 'date':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = moment.isMoment(value)
                    ? value.format(DATE_FORMAT)
                    : value;
                return <span className="ant-form-text">{text}</span>;
            }
            return (
                <DateTimePicker showTime={false} {...controlProps} placeholder={placeholder || title}/>
            );

        case 'datetime':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = moment.isMoment(value)
                    ? value.format(DATETIME_FORMAT)
                    : value;
                return <span className="ant-form-text">{text}</span>;
            }
            return (
                <DateTimePicker showTime={true} {...controlProps} placeholder={placeholder || title}/>
            );

        case 'monthPicker':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = moment.isMoment(value)
                    ? value.format(MONTH_FORMAT)
                    : value;
                return <span className="ant-form-text">{text}</span>;
            }
            return (
                <MonthPicker {...controlProps} placeholder={placeholder || title}/>
            );

        case 'select':
            const {options = [], mode, rest} = controlProps;
            return (
                <Select {...rest} mode={mode} placeholder={placeholder || title}>
                    {options.map((item, index) => (
                        <Option key={index} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            );

        case 'autoComplete':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <AutoComplete {...controlProps} allowClear filterOption={filterOption}
                                 placeholder={placeholder || title}/>;

        case 'listSelector':
            if (readonly === true) {
                const value = getFieldValue(field);
                const {
                    dataSource = [],
                    labelField = 'label',
                    valueField = 'value'
                } = controlProps;

                const selectedItem = dataSource.find(
                    item => item[valueField] === value
                );
                const text = selectedItem ? selectedItem[labelField] : value;
                return <span className="ant-form-text">{text}</span>;
            }

            return <ListSelector {...controlProps} placeholder={placeholder || title}/>;

        case 'districtSelector':
            if (readonly === true) {
                const value = getFieldValue(field);
                const text = value ? getDistrictLabel(value) : value;
                return <span className="ant-form-text">{text}</span>;
            }

            return <DistrictSelector {...controlProps} placeholder={placeholder || title}/>;

        case 'dateRangePicker':
            if (readonly === true) {
                const values = getFieldValue(field) || [];
                const text = values.map(item => item.format(DATE_FORMAT)).join(' - ');
                return <span className="ant-form-text">{text}</span>;
            }

            return <DateRangePicker locale={locale} {...controlProps} />;
        case 'checkBoxSelector':
            if (readonly === true) {
                const values = getFieldValue(field) || [];
                const {
                    dataSource = [],
                    labelField = 'label',
                    valueField = 'value'
                } = controlProps;

                const selectedItems = dataSource.find(
                    item => values.indexOf(item[valueField]) >= 0
                );
                const text = selectedItems.map(item => item[labelField]).join(', ');

                return <span className="ant-form-text">{text}</span>;
            }
            return <CheckBoxSelector {...controlProps} />;
        case 'radioSelector':
            return <RadioSelector {...controlProps} />;
        case 'textArea':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <TextArea placeholder={placeholder || title} {...controlProps}/>;

        case 'slider':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <Slider {...controlProps} placeholder={placeholder || title}/>;
        case 'switch':
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{text}</span>;
            }
            return <Switch {...controlProps} checked={getFieldValue(field)} placeholder={placeholder || title}/>;
        case 'address':
            const text = getFieldValue(field);
            return <AddressInfo {...text}/>;
        case 'treeSelector':
            if (readonly === true) {
                const value = getFieldValue(field);
                const {
                    treeData = [],
                    labelField = 'label',
                    valueField = 'value'
                } = controlProps;

                let selectedItem = treeData.find(item => item[valueField] === value);
                if (!selectedItem) {
                    let dataList = treeToList(treeData);
                    selectedItem = dataList.find(item => item[valueField] === value);
                }
                const text = selectedItem ? selectedItem[labelField] : '';
                return <span className="ant-form-text">{text}</span>;
            }
            return <TreeSelector {...controlProps} />;
        default:
            if (readonly === true) {
                const text = getFieldValue(field);
                return <span className="ant-form-text">{placeholder || text}</span>;
            }
            return <Input {...controlProps} allowClear placeholder={placeholder || title}/>;
    }
};

class FormField extends Component {
    render() {
        const {
            field,
            title,
            placeholder,
            type,
            fieldOptions = {},
            controlProps,
            defaultValue,
            readonly,
            formItemLayout = {},
            form: {getFieldDecorator, getFieldValue}
        } = this.props;

        const fieldDecoratorOptions = merge(fieldOptions, {
            initialValue: defaultValue
        });

        return (
            <FormItem {...formItemLayout} label={title || field}>
                {getFieldDecorator(field, fieldDecoratorOptions)(
                    getFieldControl({
                        field,
                        title,
                        placeholder,
                        type,
                        controlProps,
                        getFieldValue,
                        readonly
                    })
                )}
            </FormItem>
        );
    }
}

FormField.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'number',
        'formatNumber',
        'date',
        'datetime',
        'monthPicker',
        'select',
        'address',
        'treeSelector',
        'listSelector',
        'autoComplete',
        'districtSelector',
        'dateRangePicker',
        'organizationSelector',
        'checkBoxSelector',
        'textArea',
        'switch',
        'slider'
    ])
};
export default FormField;
