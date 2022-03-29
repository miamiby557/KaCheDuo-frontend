import React from 'react';
import {Card} from "antd";
import Filter from "./Filter";
import Toolbar from "./Toolbar";
import List from "./List";

const User = () => {
    return (
        <Card>
            <Filter/>
            <Toolbar/>
            <List/>
        </Card>
    );
};

export default User;