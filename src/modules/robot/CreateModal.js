import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Form, Icon, Input, Modal, Popconfirm, Table} from "antd";
import {create, hideCreate, query, updateModel, updateSubRobot} from "./actions";
import FormEditor from '../../components/FormEditor';
import {tableProps} from "../../lib/ui";
import {getPrincipal} from "../../lib/identity";


const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing}, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const {record, handleSave} = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({...record, ...values});
        });
    };

    renderCell = form => {
        this.form = form;
        const {children, dataIndex, record} = this.props;
        const {editing} = this.state;
        let column = <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>;
        return editing ? (
            <Form.Item style={{margin: 0}}>
                {form.getFieldDecorator(dataIndex, {
                    initialValue: record[dataIndex],
                })(column)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{paddingRight: 24}}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            inputType,
            options,
            placeholder,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class CreateModal extends PureComponent {

    handleCreate = () => {
        const formEditor = this.formEditor.props.form;
        if (formEditor) {
            const {dispatch, subRobotList, page, pageSize, filter = {}} = this.props;
            formEditor.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.subRobotList = subRobotList;
                    values.owner = getPrincipal().id;
                    dispatch(create(values)).then(action => {
                        if (action.error !== true) {
                            formEditor.resetFields();
                            dispatch(hideCreate());
                            dispatch(query({'owner': getPrincipal().id, ...filter, page, pageSize}));
                        }
                    });
                }
            });
        }
    };

    handleSave = values => {
        const {dispatch, subRobotList = []} = this.props;
        const found = subRobotList.find(data => data.id === values.id);
        found.phone = values.phone;
        found.pwd = values.pwd;
        dispatch(updateSubRobot(subRobotList));
    };

    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideCreate());
    };

    onValuesChange = value => {
        const {dispatch} = this.props;
        dispatch(updateModel(value));
    };

    handleAddRow = () => {
        const {dispatch, subRobotList = []} = this.props;
        subRobotList.push({"id": Math.random().toString()})
        dispatch(updateSubRobot(subRobotList));
    };

    handleDelete = (record) => {
        const {dispatch, subRobotList = []} = this.props;
        const deleteIndex = subRobotList.findIndex(item => item.id === record.id);
        subRobotList.splice(deleteIndex, 1);
        dispatch(updateSubRobot(subRobotList));
    };


    render() {
        const {loading, visible, model, subRobotList} = this.props;
        const columns = [
            {
                title: "????????????",
                dataIndex: "phone",
                editable: true,
                width: "200px",
            }, {
                title: "????????????",
                dataIndex: "pwd",
                editable: true,
                width: "200px",
            }, {
                title: '??????',
                dataIndex: '',
                key: 'x',
                width: "150px",
                render: (text, record) => (
                    <Popconfirm title="?????????????" okText="???" cancelText="???"
                                onConfirm={() => this.handleDelete(record)}>
                        <a>??????</a>
                    </Popconfirm>
                )
            }, {
                title: "",
                dataIndex: ""
            }
        ];
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const editColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => {
                    return ({
                        record,
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: this.handleSave
                    })
                },
            };
        });
        const schema = [
            {
                title: '????????????',
                fields: [
                    {
                        field: 'company',
                        title: '????????????',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '?????????????????????'}]
                        },
                    },
                    {
                        field: 'chargePhone',
                        title: '?????????????????????',
                        type: 'text'
                    },
                    {
                        field: 'email',
                        title: '??????',
                        type: 'textArea'
                    },
                    {
                        field: 'carCount',
                        title: '????????????',
                        type: 'number'
                    }
                ]
            },
            {
                title: '??????????????????',
                fields: [
                    {
                        field: 'phone',
                        title: '????????????',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '?????????????????????'}]
                        },
                    }, {
                        field: 'pwd',
                        title: '????????????',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '?????????????????????'}],
                        }
                    }
                ]
            }, {
                title: '?????????????????????????????????',
                fields: [
                    {
                        field: 'account2',
                        title: '??????',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '???????????????'}]
                        },
                    }, {
                        field: 'pwd2',
                        title: '??????',
                        type: 'text',
                        fieldOptions: {
                            rules: [{required: true, message: '???????????????'}],
                        }
                    }
                ]
            }];

        return (
            <Modal
                title="??????"
                visible={visible}
                onOk={this.handleCreate}
                onCancel={this.handleCancel}
                maskClosable={false}
                confirmLoading={loading}
                okText="??????"
                cancelText="??????"
                width="70%"
            >
                <FormEditor
                    schema={schema}
                    column={2}
                    defaultReadonly={false}
                    showActionBar={false}
                    defaultValues={model}
                    onChange={this.onValuesChange}
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
                <div className="actions">
                    <Button onClick={this.handleAddRow}><Icon type="plus"/>??????????????????</Button>
                </div>
                <Table
                    {...tableProps}
                    tableLayout={'fixed'}
                    columns={editColumns}
                    dataSource={subRobotList}
                    components={components}
                    pagination={false}
                    loading={loading}
                    rowClassName={() => 'editable-row'}
                />
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.robot.create,
        subRobotList: state.robot.subRobot.data,
        page: state.robot.list.page,
        filter: state.robot.list.filter,
        pageSize: state.robot.list.pageSize
    };
};

export default connect(mapStateToProps)(CreateModal);
