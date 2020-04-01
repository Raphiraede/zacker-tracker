/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import rootReducer from './redux/rootReducer'
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import { SignInPage } from "views/SignInPage/SignInPage";
import CreateUser from "views/CreateUser/CreateUser.js"

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import "assets/css/material-dashboard-react.css?v=1.8.0";
import HomePage from "layouts/HomePage";

const store = configureStore({
  reducer: rootReducer,
})

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={SignInPage} />
        <Route path="/create-user" component={CreateUser}/>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
)