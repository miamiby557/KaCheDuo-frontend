import React from 'react';
import {Card} from "antd";
import Toolbar from "./Toolbar";
import CreateModal from "./CreateModal";
import List from "./List";

const User = () => {
    return (
        <Card>
            <Toolbar/>
            <List/>
            <CreateModal/>
        </Card>
    );
};

export default User;