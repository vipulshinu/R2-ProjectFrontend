import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from "./Login";
import Admin from "./admin/js/Admin";
import Merchant from "./admin/js/Merchant";
import Consumer from "./admin/js/Consumer";
const routing=(
    <Router basename="/">
      <Switch>
          <Route exact component={Login} path="/"/>
          <Route exact component={Admin} path="/admin"/>
          <Route exact component={Merchant} path="/merchant"/>
          <Route exact component={Consumer} path="/consumer"/>
      </Switch>
    </Router>
);


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
