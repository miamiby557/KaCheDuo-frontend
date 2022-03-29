import React, {PureComponent} from "react";
import {TreeSelect} from 'antd';

const TreeNode = TreeSelect.TreeNode;

const renderTreeNodes = (dataSource, labelField, valueField) => {
    return dataSource.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item[labelField]} key={item[valueField]} value={item[valueField]}>
                    {renderTreeNodes(item.children, labelField, valueField)}
                </TreeNode>
            );
        }
        return <TreeNode title={item[labelField]} key={item[valueField]} value={item[valueField]}/>;
    });
};

class TreeSelector extends PureComponent {


    render() {
        const {
            treeData = [],
            labelField = 'label',
            valueField = 'value',
            placeholder = "请选择",
            width = 180,
            ...rest
        } = this.props;

        return (
            <TreeSelect
                placeholder={placeholder}
                treeDefaultExpandAll
                showSearch
                allowClear
                treeCheckable
                style={{width: width}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                {...rest}
            >{
                renderTreeNodes(treeData, labelField, valueField)
            }
            </TreeSelect>
        );
    }
}

export default TreeSelector;
