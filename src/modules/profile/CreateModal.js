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
        const {loading, visible,roleList, model} = this.props;
        const schema = [
            {
                title: '基础信息',
                fields: [
                    {
                        field: 'account',
                        title: '用户名',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入用户名'}]
                        },
                    }, {
                        field: 'password',
                        title: '密码',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '请输入密码'}],
                        },
                        controlProps: {
                            type: "password",
                        }
                    }, {
                        field: 'confirmPassword',
                        title: '确认密码',
                        type: 'text',
                        fieldOptions: {
                            rules: [
                                {required: true, message: '请输入确认密码'},
                                {validator: this.compareToFirstPassword}
                            ],
                        },
                        controlProps: {
                            type: "password",
                        }
                    }, {
                        field: 'name',
                        title: '姓名',
                        type: 'text',
                    }, {
                        field: 'email',
                        title: '邮箱',
                        type: 'text',
                    }
                ]
            },
            {
                title: '角色',
                fields: [
                    {
                        field: 'role',
                        title: '角色',
                        type: 'radioSelector',
                        controlProps: {
                            dataSource: roleList
                        },
                    },
                ]
            }];

        return (
            <Modal
                title="新增"
                visible={visible}
                onOk={this.handleCreate}
                maskClosable={false}
                onCancel={this.handleCancel}
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
        ...state.user.create,
        roleList: state.common.roleList
    };
};

export default connect(mapStateToProps)(CreateModal);
