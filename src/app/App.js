import React, {PureComponent} from "react";
import {BrowserRouter, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RouterList from "./RouteList";

const RouterListComponent = withRouter(RouterList);

class App extends PureComponent {

    render() {
        return (
            <BrowserRouter>
                <RouterListComponent/>
            </BrowserRouter>
        );
    }
}


export default connect()(App);
