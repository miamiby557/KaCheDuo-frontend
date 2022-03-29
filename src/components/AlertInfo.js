import React from 'react';
import {Badge, Icon, List, Popover} from 'antd';

const AlertInfo = props => {
    const {item = []} = props;
    const content = (<List
        size="small"
        header={null}
        footer={null}
        bordered={false}
        dataSource={item}
        renderItem={item => <List.Item>柜号：{item.cabinetNumber},需要跟进还箱操作</List.Item>}
    />);
    return (
        <Popover content={content}>
            <Badge count={item.length}>
                <Icon type="notification"/>
            </Badge>
        </Popover>
    );
};

export default AlertInfo;
