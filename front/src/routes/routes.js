import React from 'react';
import LogIn from '../components/logIn/logIn';
import Registration from '../components/registration/registration';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';


export default function Routes() {
    return (
    <Router>
        <Switch>
          <Route path = '/' exact component = {LogIn} />
          <Route path = "/todolist/Registration" exact component = {Registration} />
        </Switch>
    </Router>
    )
}
