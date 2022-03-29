import React from 'react';
import {Icon, List, Popover} from 'antd';

const DaiBanInfo = props => {
    const text = <span>单号</span>;
    const {item = []} = props;
    const data = [];
    if(item.length > 10){
        const list = item.splice(0, 10);
        list.forEach(item=>{
            data.push(item);
        });
        data.push("......");
    }else{
        item.forEach(item=>{
            data.push(item);
        });
    }
    const content = (<List
        size="small"
        header={null}
        footer={null}
        bordered={false}
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
    />);
    return (
        <Popover title={text} content={content}>
            <Icon type="question-circle"/>
        </Popover>
    );
};

export default DaiBanInfo;
