import "./App.css";
import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import AppBar from "./components/AppBar";
import { authOperations } from "./redux/auth";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const HomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "home-page" */)
);
const RegisterPage = lazy(() =>
  import("./views/RegisterPage" /* webpackChunkName: "register-page" */)
);
const LoginPage = lazy(() =>
  import("./views/LoginPage" /* webpackChunkName: "login-page" */)
);
const PhoneBook = lazy(() =>
  import("./views/PhoneBook" /* webpackChunkName: "phone-book-page" */)
);
const NotFoundPage = lazy(() =>
  import("./views/NotFoundPage" /* webpackChunkName: "not-found-page" */)
);

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
  }
  render() {
    return (
      <div className="App">
        <AppBar userEmail={"no email"} />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <PublicRoute
              exact
              path={routes.register}
              redirectTo={routes.home}
              restricted
              component={RegisterPage}
            />
            <PublicRoute
              exact
              path={routes.login}
              redirectTo={routes.home}
              restricted
              component={LoginPage}
            />
            <PrivateRoute
              exact
              path={routes.contacts}
              redirectTo={routes.home}
              component={PhoneBook}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUser: () => dispatch(authOperations.getUserData()),
});

export default connect(null, mapDispatchToProps)(App);
