import React from 'react';
import {Timeline} from 'antd';

const LogTimeline = ({dataSource = []}) => {
    return (
        <Timeline>
            {dataSource &&
            dataSource.map((item, index) => {
                let options = {};
                if (index === 0) {
                    options = {color: "green"};
                }
                return (<Timeline.Item {...options} key={index}>
                    {(item["operator"]) + " "+item["operation"]+ " 操作网点:"+ (item["operateAddress"] || "") +"  目的网点:"+(item["terminalAddress"] || "")+"  "+ item["operateTime"]}</Timeline.Item> );

            })}
        </Timeline>
    );
};

export default LogTimeline;
