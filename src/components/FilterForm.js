import React, {Component} from 'react';
import {Button, Form, Icon} from 'antd';
import {mapModelToFields} from '../lib/redux-utils';
import FormField from './FormEditor/FormField';

const FormItem = Form.Item;

class FilterForm extends Component {
    state = {
        expand: false
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            callback,
            form: {validateFields}
        } = this.props;
        validateFields((err, values) => {
            if (!err) {
                callback && callback(values);
                this.setState({expand: false});
            }
        });
    };

    handleToggle = () => {
        this.setState({expand: !this.state.expand});
    };

    createFields = fields => {
        const {form, readonly} = this.props;

        const formItems = [];
        const expand = this.state.expand;
        fields.forEach(item => {
            if (item.expandable || expand) {
                formItems.push(<FormField form={form} {...item} readonly={readonly}/>);
            }
        });
        return formItems;
    };

    render() {
        const {schema = [], loading, formProps = {}, formOthers} = this.props;
        const hasHidden = schema.find(item => item != null && item.expandable === false);
        // console.info('hasHidden', hasHidden);
        return (
            <div className="filter">
                <Form onSubmit={this.handleSubmit} layout="inline" {...formProps}>
                    {this.createFields(schema)}
                    <FormItem>
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            <Icon type="search"/>搜索
                        </Button>
                        {hasHidden ? (
                            <a
                                style={{marginLeft: 8, fontSize: 12}}
                                onClick={this.handleToggle}
                            >
                                {this.state.expand ? '收起' : '展开'}{' '}
                                <Icon type={this.state.expand ? 'up' : 'down'}/>
                            </a>
                        ) : (
                            ''
                        )}
                    </FormItem>
                    {formOthers}
                </Form>
            </div>
        );
    }
}

FilterForm.propTypes = {
    // schema: PropTypes.array
};

const mapPropsToFields = ({values}) => {
    return mapModelToFields(values);
};

const handleValuesChange = ({onValuesChange}, fields) => {
    onValuesChange && onValuesChange(fields);
};

export default Form.create({
    mapPropsToFields,
    onValuesChange: handleValuesChange
})(FilterForm);
