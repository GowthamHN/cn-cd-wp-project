import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
//import { Container } from "reactstrap";
// core components
import Header from "../components/Header/header.js"
import routes from "../routes.js";
import Login from "../components/Login/login"

class User extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        console.log(prop)
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  render() {
    return (
      <>
        <Header />
        <div >
          <Switch>{this.getRoutes(routes)}</Switch>
          <Login />
        </div>
      </>
    );
  }
}

export default User;
