import React, { useEffect, useState } from "react";
import * as RouteConstant from "../constants/RouteConstant";

import { ReactComponent as Home } from "../images/Navbar/Home.svg";
import { ReactComponent as Layers } from "../images/Navbar/Layers.svg";
import { ReactComponent as User } from "../images/Navbar/User.svg";
import { ReactComponent as Heart } from "../images/Navbar/Heart.svg";
import { ReactComponent as Label } from "../images/Navbar/Label.svg";
import { ReactComponent as LightBulb } from "../images/Navbar/LightBulb.svg";
import { ReactComponent as Lightning } from "../images/Navbar/Lightning.svg";
import logo from "../images/Spotify_Logo_RGB_Green.png";
import { Menu, X } from "react-feather";
import { NavLink } from "react-router-dom";
import "../style/Navbar.scss";
import SearchBtn from "./Search/SearchBtn";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    return () => window.removeEventListener("resize", checkWindowWidth);
  });

  const checkWindowWidth = () => {
    setIsHidden(window.innerWidth <= 1024);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarItems = [
    { path: RouteConstant.HOME, icon: <Home />, name: "Home" },
    { path: RouteConstant.CHARTS, icon: <Lightning />, name: "Charts" },
    { path: RouteConstant.NEW, icon: <Label />, name: "New" },
    { path: RouteConstant.GENRES, icon: <LightBulb />, name: "Genres" },
    { path: RouteConstant.PLAYLISTS, icon: <Layers />, name: "Playlists" },
    { path: RouteConstant.LIKED, icon: <Heart />, name: "Songs" },
    { path: RouteConstant.ARTISTS, icon: <User />, name: "Artists" },
  ];
  return (
    <>
      {isHidden && (
        <div
          className="navbar__open-btn flex-center fixed-btn"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </div>
      )}
      <nav
        className={`app__navbar ${
          isHidden ? `app__navbar_mobile${isMenuOpen ? "_open" : ""}` : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar__logo">
            <img className="navbar__logo-img" src={logo} alt="" />
            <SearchBtn className="navbar__search" />
          </div>
          <ul className="navbar__group">
            {navbarItems.slice(0, 4).map(({ path, icon, name }, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    isMenuOpen && toggleMenu();
                  }}
                >
                  <NavLink
                    exact
                    to={path}
                    className="navbar__item"
                    activeClassName="active"
                  >
                    <span className="navbar__icon">{icon}</span>
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <ul className="navbar__group">
            <p className="navbar__group-header">YOUR LIBRARY</p>
            {navbarItems.slice(4, 7).map(({ path, icon, name }, index) => {
              return (
                <li
                  key={index + 4}
                  onClick={() => {
                    isMenuOpen && toggleMenu();
                  }}
                >
                  <NavLink
                    exact
                    to={path}
                    className="navbar__item"
                    activeClassName="active"
                  >
                    <span className="navbar__icon">{icon}</span>
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
  // }
}
