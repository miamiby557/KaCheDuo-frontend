import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Form, Icon, Input, Row, notification, Col} from "antd";
import {formItemLayout,formButtonLayout} from "../../lib/ui";
import {logout} from '../../lib/identity';
import {changePassword} from "./actions";

const FormItem = Form.Item;

class EditTab extends PureComponent {

    handleModify = () => {
        const {form: {validateFieldsAndScroll}, dispatch, model} = this.props;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch(changePassword({...model, ...values})).then(action => {
                    if (action.error !== true) {
                        notification.success({
                            message: '修改成功',
                            description: '',
                        });
                        this.timer = setTimeout(
                            () => {
                                logout();
                            },
                            1000
                        );
                    }
                });
            }
        });
    };


    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;

        return (
            <Col offset={4} span={8}>
            <Form>
                <Row>
                    <FormItem {...formItemLayout} label="原密码">
                        {getFieldDecorator("oldPassword", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入原密码"
                                }
                            ]
                        })(<Input type="password" placeholder="原密码" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="新密码">
                        {getFieldDecorator("newPassword", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入新密码"
                                }
                            ]
                        })(<Input type="password" placeholder="新密码"/>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认密码">
                        {getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    message: "请再次输入新密码"
                                },{
                                    validator: this.compareToFirstPassword,
                                }
                            ]
                        })(<Input type="password" placeholder="确认密码"/>)}
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
    };
};


export default connect(mapStateToProps)(Form.create()(EditTab));
