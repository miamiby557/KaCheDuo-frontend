import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import {create, hideCreate, query} from "./actions";
import FormEditor from '../../components/FormEditor';

class CreateModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideCreate());
                            dispatch(query({}));
                        }
                    });
                }
            });
        }
    };
    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideCreate());
    };

    compareToFirstPassword = (rule, value, callback) => {
        const formEditor = this.formEditor.props.form;
        if (value && value !== formEditor.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };


    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'account',
                        title: '登陆账号',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入登陆账号'}]
                        },
                    }, {
                        field: 'password',
                        title: '密码',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入密码'}],
                        }
                    }, {
                        field: 'company',
                        title: '公司全称',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入公司全称'}],
                        }
                    }, {
                        field: 'wechat',
                        title: '微信号',
                        type: 'text',
                    }
                ]
            }];

        return (
            <Modal
                title="新增"
                visible={visible}
                onOk={this.handleCreate}
                onCancel={this.handleCancel}
                maskClosable={false}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
                width="40%"
            >
                <FormEditor
                    schema={schema}
                    column={1}
                    defaultReadonly={false}
                    showActionBar={false}
                    defaultValues={model}
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.user.create
    };
};

export default connect(mapStateToProps)(CreateModal);
