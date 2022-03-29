import React, {PureComponent} from "react";
import {Input, Popconfirm, Table} from 'antd';

const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}}
                     value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

class EditableTable extends PureComponent {

    constructor(props) {
        let {columns} = props;
        const operation = {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                                : <a onClick={() => this.edit(record.id)}>修改</a>
                        }
                    </div>
                );
            },
        };
        columns.forEach((item) => {
                if(item.editable&&!item.render)
                    item.render = (text, record) => this.renderColumns(text, record, item.dataIndex);
        });
        columns.push(operation);
        super(props);
        this.state = {data:props.dataSource};
        this.cacheData = props.dataSource.map(item => ({...item}));
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
    }

    edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({data: newData});
        }
    }

    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
        }
    }

    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    render() {
        const {columns,dataSource} = this.props;
        this.setState({data:dataSource});
        return <Table  rowKey = "id" dataSource={dataSource} columns={columns}/>;
    }
}

export default EditableTable;
