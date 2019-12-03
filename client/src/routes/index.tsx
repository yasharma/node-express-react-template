import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, View } from '../components';
import { Header } from '../components/Header';

function AppRouter() {
  return (
    <Router>
      <React.Fragment>
      <Header />  
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/view/:id" component={View} />
      </Switch>  
      </React.Fragment>
    </Router>
  );
}

export default AppRouter;