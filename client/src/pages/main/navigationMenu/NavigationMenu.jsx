import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsMoon, BsSun } from "react-icons/bs";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  OpenLinksButton,
  NavbarLinkExtended,
  NavHamburger,
  Bar,
  Logo,
  NavbarLinkExtendedMobile,
  ThemeBTN,
} from "./Navigation_Styles/Nav.styles";

import { Context } from "../../../store/Context";
import { baseUrl } from "../../../assets/api/api";

function NavigationMenu() {
  const navigate = useNavigate();

  const { isLoggedIn, setUser, setIsLoggedIn, darkTheme, setDarkTheme } =
    useContext(Context);

  const [extendNavbar, setExtendNavbar] = useState(false);

  const pages = ["dashboard", "documentation", "contact"];

  const logoutHandler = () => {
    axios
      .get(`${baseUrl}/authentication/logout`)
      .then(() => {
        setUser();
        setIsLoggedIn(false);
        sessionStorage.removeItem("loggedInUser");
        navigate("/");
        setExtendNavbar(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer
        className={darkTheme ? "dark-theme" : "light-theme"}
      >
        <RightContainer>
          <Logo
            onClick={() => {
              navigate("/");
            }}
          >
            <div className={darkTheme ? "dark-theme" : "light-theme"}>
              {" "}
              <span>L</span>azy <span>D</span>ev's
            </div>
          </Logo>
        </RightContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <ThemeBTN onClick={() => setDarkTheme(!darkTheme)}>
              {darkTheme ? <BsMoon /> : <BsSun />}
            </ThemeBTN>
            {pages.map((page, i) => (
              <>
                <NavbarLinkExtended
                  key={i}
                  to={`/${page}`}
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                  className={darkTheme ? "dark-theme" : "light-theme"}
                >
                  {page}
                </NavbarLinkExtended>
                <span></span>
              </>
            ))}
            {!isLoggedIn ? (
              <>
                <NavbarLinkExtended
                  to={`/login`}
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                  className={darkTheme ? "dark-theme" : "light-theme"}
                >
                  Login
                </NavbarLinkExtended>
                <NavbarLinkExtended
                  darkTheme={darkTheme}
                  className={
                    darkTheme ? "signup dark-theme" : "signup light-theme"
                  }
                  to={`/register`}
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                >
                  Sign Up <span></span>
                </NavbarLinkExtended>
              </>
            ) : (
              <div>
                <NavbarLinkExtended
                  to={`/profile`}
                  onClick={() => {
                    setExtendNavbar((curr) => !curr);
                  }}
                  className={darkTheme ? "dark-theme" : "light-theme"}
                >
                  Profile
                </NavbarLinkExtended>
                <NavbarLinkExtended
                  className={darkTheme ? "dark-theme" : "light-theme"}
                  onClick={logoutHandler}
                >
                  {/* <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon> */}
                  Logout
                </NavbarLinkExtended>
              </div>
            )}
          </NavbarLinkContainer>
          <OpenLinksButton
            onClick={() => {
              setExtendNavbar((curr) => !curr);
            }}
          >
            {extendNavbar ? (
              <span className={darkTheme ? "dark-theme" : "light-theme"}>
                &#10005;
              </span>
            ) : (
              <>
                {" "}
                <NavHamburger
                  className={darkTheme ? "dark-theme" : "light-theme"}
                >
                  <Bar
                    className={darkTheme ? "dark-theme" : "light-theme"}
                  ></Bar>
                </NavHamburger>
              </>
            )}
          </OpenLinksButton>
        </LeftContainer>
      </NavbarInnerContainer>

      {/* ***** MOBILE NAVBAR ****** */}

      {extendNavbar && (
        <NavbarExtendedContainer
          className={darkTheme ? "dark-theme" : "light-theme"}
        >
          {pages.map((page, i) => (
            <NavbarLinkExtendedMobile
              className={darkTheme ? "dark-theme" : "light-theme"}
              key={i}
              to={`/${page}`}
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {page}
            </NavbarLinkExtendedMobile>
          ))}

          {!isLoggedIn ? (
            <>
              <NavbarLinkExtendedMobile
                className={darkTheme ? "dark-theme" : "light-theme"}
                to={`/login`}
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                Login
              </NavbarLinkExtendedMobile>
              <NavbarLinkExtendedMobile
                className={
                  darkTheme ? "signup dark-theme" : "signup light-theme"
                }
                to={`/register`}
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                Sign Up <span></span>
              </NavbarLinkExtendedMobile>
            </>
          ) : (
            <>
              <NavbarLinkExtendedMobile
                className={darkTheme ? "dark-theme" : "light-theme"}
                to={`/profile`}
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                Profile
              </NavbarLinkExtendedMobile>
              <NavbarLinkExtendedMobile
                className={darkTheme ? "dark-theme" : "light-theme"}
                onClick={logoutHandler}
              >
                {/* <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon> */}
                Logout
              </NavbarLinkExtendedMobile>
            </>
          )}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default NavigationMenu;
