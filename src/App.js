import React, { Component } from "react";
import { Route } from "react-router-dom";

import LoginCallback from "./component/LoginCallBack";
import Navbar from "./component/Navbar";
import Player from "./component/Player/Player";
import Search from "./component/Search/Search";
import Main from "./component/Main";
import * as RouteConstant from "./constants/RouteConstant";
import "./App.scss";
import Auth from "./utils/auth";
export default class App extends Component {
  constructor() {
    super();

    Auth.setTokenToSpotify();
  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <Navbar />
          <div className="app__content">
            <Search />
            <Main />
            <Route
              path={RouteConstant.LOGIN_CALLBACK}
              component={LoginCallback}
            />
          </div>
          <Player />
        </div>
      </div>
    );
  }
}
