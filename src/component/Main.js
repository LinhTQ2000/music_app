import React, { Component } from "react";
import { Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
import { Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Auth from "../utils/auth";
import { Switch as SwichMode, Typography } from "@mui/material";
import {
  Avatar,
  Chip,
  FormControlLabel,
  FormGroup,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { DARK_MODE, USER_AVATAR, USER_NAME } from "../constants/AppConstants";
import { Logout } from "@mui/icons-material";

class Main extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
    if (JSON.parse(localStorage.getItem(DARK_MODE)) === true) {
      document.body.classList.add("dark-mode");
    }
    this.state = {
      anchorEl: null,
      darkMode: JSON.parse(localStorage.getItem(DARK_MODE)) || false,
    };
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.darkMode) {
      document.body.classList.add("dark-mode");

      const arrH3 = document.getElementsByTagName("h3");
      for (const h3 of arrH3) {
        h3?.classList.add("dark-mode");
      }

      const arrBlock = document.getElementsByClassName("block__title");
      for (const title of arrBlock) {
        title?.classList.add("dark-mode");
      }

      const arrArtist = document.querySelectorAll(".artist__name");
      for (const artist of arrArtist) {
        artist?.classList.add("dark-mode");
      }
      document.querySelector(".active")?.classList.add("dark-mode");
    } else {
      document.body?.classList.remove("dark-mode");

      const arrH3 = document.getElementsByTagName("h3");
      for (const h3 of arrH3) {
        h3?.classList.remove("dark-mode");
      }

      const arrBlock = document.getElementsByClassName("block__title");
      for (const title of arrBlock) {
        title?.classList.remove("dark-mode");
      }

      const arrArtist = document.querySelectorAll(".artist__name");
      for (const artist of arrArtist) {
        artist?.classList.remove("dark-mode");
      }
      document.querySelector(".active")?.classList.remove("dark-mode");
    }
  }

  handleModeChange() {
    this.setState({
      darkMode: !this.state.darkMode,
    });
    localStorage.setItem(DARK_MODE, !this.state.darkMode);
  }

  componentWillUpdate() {
    const { location } = this.props;
    if (!(location.state && location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  handleLogout = () => {
    Auth.logout();
    Auth.redirectToLoginPage();
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { location } = this.props;
    const isModal =
      location.state &&
      location.state.modal &&
      this.previousLocation !== location;
    const userName = localStorage.getItem(USER_NAME);
    const avatarUrl = localStorage.getItem(USER_AVATAR);
    const open = Boolean(this.state.anchorEl);
    const anchorEl = this.state.anchorEl;
    return (
      <>
        <div className="user-logout">
          <Tooltip title="user">
            <IconButton
              onClick={this.handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Chip
                avatar={<Avatar alt={userName} src={avatarUrl} />}
                label={userName}
                sx={this.state.darkMode ? { color: "#fff" } : { color: "#000" }}
                variant="outlined"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={this.handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 5,
                  height: 5,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={this.handleModeChange}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <SwichMode size="small" checked={this.state.darkMode} />
                  }
                  label={
                    <Typography sx={{ fontSize: "14px" }}>Dark Mode</Typography>
                  }
                />
              </FormGroup>
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} onClick={this.handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path={RouteConstant.HOME} component={Home} />
          <Route path={RouteConstant.PLAYLISTS} component={UserPlaylists} />
          <Route path={RouteConstant.ARTISTS} component={FollowedArtists} />
          <Route path={RouteConstant.LIKED} component={SavedTracks} />
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
            component={CategoryPlaylists}
          />
          <Route path={RouteConstant.NEW} component={NewReleases} />
          <Route path={RouteConstant.GENRES} component={Categories} />
          <Route path={RouteConstant.CHARTS} component={Charts} />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        {isModal ? (
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
        ) : null}
      </>
    );
  }
}

export default withRouter(Main);
