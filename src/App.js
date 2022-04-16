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
  // getHashParams = () => {
  //   const { location } = window,
  //     hashParams = {};
  //   let e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = location?.hash.substring(1);
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   console.log("location", location);
  //   return hashParams;
  // };

  render() {
    // const params = this.getHashParams(),
    //   access_token = params?.access_token,
    //   state = params?.state,
    //   storedState = localStorage.getItem("spotify_auth_state");
    // console.log("access_token", access_token);

    // if (access_token && (state == null || state !== storedState)) {
    //   console.error("There was an error during the authentication");
    // } else {
    //   const tokenExpirationSec = new Date().getTime() / 1000 + 3600,
    //     tokenExpirationTime = new Date(tokenExpirationSec * 1000);
    //   Auth.setToken(access_token, tokenExpirationTime);
    //   localStorage.removeItem("spotify_auth_state");
    //   Auth.setTokenToSpotify();
    //   Auth.setUserId();
    // }
    return (
      <div className="app">
        <div className="app__container">
          <Navbar />
          <div className="app__content">
            <Search />
            <Main />
            <Route
              path={RouteConstant.LOGIN_CALLBACK}
              component={<LoginCallback />}
            />
          </div>
          <Player />
        </div>
      </div>
    );
  }
}
