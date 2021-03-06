import React, {PureComponent} from "react";
import {Form, Icon, Input, Popconfirm, Table, notification} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {del, query, updateDataSource, updateDriver} from "./actions";
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
        return editing ? (
            <Form.Item style={{margin: 0}}>
                {form.getFieldDecorator(dataIndex, {
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>)}
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


class List extends PureComponent {


    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({"owner": getPrincipal().id}));
    };

    handleDelete = id => {
        const {dispatch, filter} = this.props;
        dispatch(del(id)).then(() => {
            dispatch(query({...filter}));
        });
    };

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({"owner": getPrincipal().id, ...filter, page, pageSize}));
    };

    handleSave = row => {
        const {dispatch, dataSource} = this.props;
        dispatch(updateDriver(row)).then(action => {
            if (action.error !== true) {
                let deleteIndex = dataSource.findIndex(item => item.id === row.id);
                dataSource.splice(deleteIndex, 1, row);
                dispatch(updateDataSource(dataSource));
            } else {
                notification.error({
                    message: '????????????:' + action.message
                });
            }
        });
    };

    render() {

        const {
            page,
            pageSize,
            totalElements,
            dataSource,
            loading,
        } = this.props;

        const columns = [
            {
                title: '??????',
                width: "50px",
                render:(text,record,index)=>`${index+1}`,
                fixed: "left"
            },{
                title: "????????????",
                dataIndex: "name",
                width: "150px",
            }, {
                title: "????????????",
                dataIndex: "phone",
                width: "150px"
            }, {
                title: "????????????",
                dataIndex: "vehicleNo",
                width: "150px"
            }, {
                title: "????????????",
                dataIndex: "company",
                width: "250px"
            }, {
                title: "?????????(??????)",
                dataIndex: "wechat",
                editable: true,
                width: "220px"
            }, {
                title: "??????ID(?????????)",
                dataIndex: "wxid",
                editable: true,
                width: "220px"
            }, {
                title: "?????????????????????",
                dataIndex: "ownerWechat",
                editable: true,
                width: "220px"
            }, {
                title: "????????????",
                dataIndex: "friend",
                width: "200px",
                render: (text, record) => {
                    if (record.friend === true) {
                        return <span>???</span>;
                    } else {
                        return <span>??????</span>;
                    }
                }
            }, {
                title: '??????',
                dataIndex: '',
                key: '',
                width: "100px",
                align: 'center',
                render: (text, record) => <span>
                    <Popconfirm title="?????????????" okText="???" cancelText="???"
                                onConfirm={() => this.handleDelete(record.id)}>
                        <Icon type="delete"/>
                    </Popconfirm>
                </span>,
            }, {
                title: "",
                dataIndex: ""
            }
        ];

        const editColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const tablePagination = {
            ...paginationProps,
            total: totalElements,
            current: page,
            pageSize: pageSize,
            onShowSizeChange: (current, newSize) =>
                this.onPageChange && this.onPageChange(1, newSize),
            onChange: this.onPageChange
        };

        return (
            <Table
                {...tableProps}
                columns={editColumns}
                scroll={{x: 1500, y: 'calc(100vh - 380px)'}}
                dataSource={dataSource}
                components={components}
                pagination={tablePagination}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.driver.list
    };
};

export default connect(mapStateToProps)(List);
