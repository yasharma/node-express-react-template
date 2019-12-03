import React from "react";
import { PublicRoute } from "./PublicRoute";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { CurrencyConverter } from "../components/currency-convertor";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/" component={CurrencyConverter} />
      </Switch>
    </Router>
  );
};
