import React, {PureComponent} from "react";
import {Redirect} from "react-router-dom";
import {Button, Checkbox, Form, Icon, Input, notification} from "antd";
import {login} from "../../lib/identity";
import styles from "./Login.module.less";
import {post} from "../../lib/http";

class Login extends PureComponent {
    state = {
        redirectToReferrer: false
    };

    handleSubmit = event => {
        event.preventDefault();
        const {form: {validateFieldsAndScroll}} = this.props;

        validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                post('/user/authenticate', values)
                    .then(identity => {
                        login(identity);
                        this.setState({redirectToReferrer: true});
                        window.location.href = "/";
                    })
                    .catch(ex => {
                        notification.error({
                            message: ex.message
                        });
                    });
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        const {loading, form: {getFieldDecorator}} = this.props;

        return (
            <div className={styles.main}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("account", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入员工编号！"
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="user" className={styles.prefixIcon}/>}
                                placeholder="员工编号"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码！"
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="lock" className={styles.prefixIcon}/>}
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={styles.additional}>
                        {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true
                        })(<Checkbox className={styles.autoLogin}>自动登录</Checkbox>)}
                        <a className={styles.forgot} href="">
                            忘记密码
                        </a>
                        <Button
                            size="large"
                            loading={loading}
                            className={styles.submit}
                            type="primary"
                            htmlType="submit"
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrapedForm = Form.create()(Login);
export default WrapedForm;
