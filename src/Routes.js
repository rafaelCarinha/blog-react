import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Posts from "./Post/PostList";
import Home from  "./Home/Home"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/Posts" exact component={Posts} />
                </Switch>
            </Router>
        )
    }
}