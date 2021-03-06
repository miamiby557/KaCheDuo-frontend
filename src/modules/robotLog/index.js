import React from 'react';
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";

const RobotLog = () => {
    return (
        <Card>
            <Filter/>
            <List/>
        </Card>
    );
};

export default RobotLog;