import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Col, Form, Icon, Input, notification, Row} from "antd";
import {formButtonLayout, formItemLayout} from "../../lib/ui";
import {mapModelToFields} from '../../lib/redux-utils';
import {getUser, modify} from "./actions";
import {getPrincipal} from "../../lib/identity";

const FormItem = Form.Item;

class EditTab extends PureComponent {
    handleModify = () => {
        const {form: {validateFieldsAndScroll}, dispatch, model} = this.props;

        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const principal = getPrincipal();
                dispatch(modify({...model, ...values,userId:principal.id})).then(action => {
                    if (action.error !== true) {
                        notification.success({
                            message: '修改成功',
                            description: '',
                        });
                        dispatch(getUser(principal.id));
                    }
                });
            }
        });
    };


    render() {
        const {model, form: {getFieldDecorator}} = this.props;

        return (
            <Col offset={4} span={8}>
                <Form>
                    <Row>
                        <FormItem {...formItemLayout} label="账号">
                            <span className="ant-form-text">{model.account}</span>
                        </FormItem>

                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator("nickName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入姓名"
                                    }
                                ]
                            })(<Input placeholder="姓名"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator("email")(<Input placeholder="邮箱"/>)}
                        </FormItem>
                        <FormItem {...formButtonLayout}  >
                            <Button type="primary" onClick={this.handleModify}><Icon type="edit"/>保存</Button>
                        </FormItem>
                    </Row>
                </Form>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.profile.tab,
        currUserOrgList: state.common.currUserOrgList
    };
};

const mapPropsToFields = ({model}) => {
    return mapModelToFields(model);
};

export default connect(mapStateToProps)(Form.create({mapPropsToFields})(EditTab));
