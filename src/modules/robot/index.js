import React from 'react';
import {Card} from "antd";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import List from "./List";
import Toolbar from "./Toolbar";
import Filter from "./Filter";

const Robot = () => {
    return (
        <Card>
            <Filter/>
            <Toolbar/>
            <List/>
            <CreateModal/>
            <UpdateModal/>
        </Card>
    );
};

export default Robot;