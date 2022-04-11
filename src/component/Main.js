import React, { Component, useEffect, useState } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import * as RouteConstant from "../constants/RouteConstant";
import Album from "../pages/Album";
import NewReleases from "../pages/NewReleases";
import Artist from "../pages/Artist/Artist";
import FollowedArtists from "../pages/FollowedArtists";
import Categories from "../pages/Categories";
import Charts from "../pages/Charts/Charts";
import CategoryPlaylists from "../pages/CategoryPlaylists";
import UserPlaylists from "../pages/UserPlaylists";
import Playlist from "../pages/Playlist";
import SavedTracks from "../pages/SavedTracks";
import TracklistModal from "../pages/Tracklist/TracklistModal";
import Home from "../pages/HomePage/Home";
import Page404 from "../pages/Page404";

function Main() {
  const location = useLocation();
  const isModal = location.state && location.state?.modal;
  // constructor(props) {
  //   super(props);
  //   this.previousLocation = this.props.location;
  // }

  // componentWillUpdate() {
  //   const { location } = this.props;
  //   if (!(location.state && location.state.modal)) {
  //     this.previousLocation = this.props.location;
  //   }
  //   console.log("this.props.location", this.props.location);
  // }

  // render() {
  //   const { location } = this.props;
  //   const isModal =
  //     location.state &&
  //     location.state.modal &&
  //     this.previousLocation !== location;
  return (
    <>
      <Routes location={location}>
        <Route path={RouteConstant.NEW} element={<NewReleases />} />
        {/* <Route exact path={RouteConstant.HOME} element={<Home />} /> */}
        {/* <Route path={RouteConstant.PLAYLISTS} element={UserPlaylists} />
        <Route path={RouteConstant.ARTISTS} element={FollowedArtists} />
        <Route path={RouteConstant.LIKED} element={SavedTracks} />
        <Route
          path={`${RouteConstant.ALBUM}/:id`}
          render={(props) => {
            return <Album id={props.match.params.id} {...props} />;
          }}
        />
        <Route
          path={`${RouteConstant.PLAYLIST}/:id`}
          render={(props) => {
            return <Playlist id={props.match.params.id} {...props} />;
          }}
        />
        <Route
          path={`${RouteConstant.ARTIST}/:id`}
          render={(props) => {
            return (
              <Artist
                location={isModal ? this.previousLocation : location}
                {...props}
              />
            );
          }}
        />
        <Route
          path={`${RouteConstant.CATEGORY_PLAYLISTS}/:id`}
          element={CategoryPlaylists}
        />
        <Route path={RouteConstant.NEW} element={NewReleases} />
        <Route path={RouteConstant.GENRES} element={Categories} />
        <Route path={RouteConstant.CHARTS} element={Charts} />
        <Route path="*">
          <Page404 />
        </Route> */}
      </Routes>
      {/* {isModal ? (
        <Route
          path={`${
            location.state.type === "album"
              ? RouteConstant.ALBUM
              : RouteConstant.PLAYLIST
          }/:id`}
          render={(props) => {
            return (
              <TransitionGroup>
                <CSSTransition
                  key={props.location.key}
                  appear={true}
                  timeout={600}
                  classNames="tracklist__overlay"
                  unmountOnExit={true}
                >
                  <TracklistModal>
                    {props.location.state.type === "album" ? (
                      <Album id={props.match.params.id} {...props} />
                    ) : (
                      <Playlist id={props.match.params.id} {...props} />
                    )}
                  </TracklistModal>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      ) : null} */}
    </>
  );
}

export default Main;
