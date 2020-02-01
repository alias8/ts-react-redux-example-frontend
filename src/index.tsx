import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AccountDetails from "./components/AccountDetails";
import App from "./components/App";
import CustomerDetails from "./components/CustomerDetails";
import InvoiceDetails from "./components/InvoiceDetails";
import NoMatch from "./components/NoMatch";
import requireAuth from "./components/requireAuth";
import "./index.scss";
import Accounts from "./pages/Accounts";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "./store";

console.log("asdfdsaada", process.env.REACT_APP_DB_HOST);

const Root = () => {
  return (
    <Provider store={createStore()}>
      <Router>
        <App>
          <Switch>
            <Route exact={true} path={"/"} component={LoginForm} />
            <Route
              exact={true}
              path={"/dashboard"}
              component={requireAuth(Dashboard)}
            />
            <Route
              exact={true}
              path={"/customers"}
              component={requireAuth(Customers)}
            />
            <Route
              exact={true}
              path={"/customer-details/:id"}
              component={requireAuth(CustomerDetails)}
            />
            <Route
              exact={true}
              path={"/account-details/:id"}
              component={requireAuth(AccountDetails)}
            />
            <Route
              exact={true}
              path={"/invoice-details/:id"}
              component={requireAuth(InvoiceDetails)}
            />
            <Route
              exact={true}
              path={"/accounts"}
              component={requireAuth(Accounts)}
            />
            <Route component={NoMatch} />
          </Switch>
        </App>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
