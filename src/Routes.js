import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Posts from "./Post/PostList";
import PostForm from "./Post/PostForm";
import ViewPost from "./Post/ViewPost";
import Home from  "./Home/Home"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/Posts" exact component={Posts} />
                    <Route path="/PostForm" exact component={PostForm} />
                    <Route path="/ViewPost" exact component={ViewPost} />
                </Switch>
            </Router>
        )
    }
}