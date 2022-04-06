import React from 'react';
import {Card} from "antd";
import List from "./List";
import Filter from "./Filter";
import ShowPicModal from "./ShowPicModal";

const RobotLog = () => {
    return (
        <Card>
            <Filter/>
            <List/>
            <ShowPicModal/>
        </Card>
    );
};

export default RobotLog;