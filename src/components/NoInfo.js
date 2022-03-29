import React from 'react';
import {Popover} from 'antd';
import Block from "./Block";

const NoInfo = props => {
    const {item=[], valueLabel} = props;
    let codes = [];
    item && item.forEach(item=>{
        codes.push(item[valueLabel]);
    });
    const [first] = codes;
    const label = codes.length > 1 ? first + ' ...' : first;
    const content = (<div style={{width:"350px"}}>
        {codes.map((item, i) => {
            return <Block key={item}>{item}</Block>
        })}
    </div>);
    return (
        <Popover content={content} placement="right">
            <span>{label}</span>
        </Popover>
    );
};

export default NoInfo;
