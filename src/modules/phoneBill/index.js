import React from 'react';
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";
import Toolbar from "./Toolbar";

const PhoneBill = () => {
    return (
        <Card>
            <Filter/>
            <Toolbar/>
            <div style={{color: 'red'}}>
                温馨提示:如果没有选择时间范围，默认导出当天的账单
            </div>
            <List/>
        </Card>
    );
};

export default PhoneBill;