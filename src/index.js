import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import './index.css';
//import User from "./layouts/user.js";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/home" render={props => <User {...props} />} />
//       <Redirect from="/" to="/home/login" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
