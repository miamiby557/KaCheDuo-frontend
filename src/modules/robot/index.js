import React from 'react';
import {Card} from "antd";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import List from "./List";
import Toolbar from "./Toolbar";

const Robot = () => {
    return (
        <Card>
            <Toolbar/>
            <List/>
            <CreateModal/>
            <UpdateModal/>
        </Card>
    );
};

export default Robot;