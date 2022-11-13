import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "./nav_styles_active.css";
export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  /* background: linear-gradient(to right, #24243e, #302b63, #0f0c29); */
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 100000;
  overflow-y: hidden;
  @media (min-width: 920px) {
    height: 80px;
  }
`;

export const RightContainer = styled.div`
  flex: 20%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

export const LeftContainer = styled.div`
  flex: 80%;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  align-items: center;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  position: fixed;
  top: 0;
  /* background: var(--backgroundColor); */
  z-index: 10;

  &.dark-theme {
    background: var(--backgroundColor);
    box-shadow: 0 0 10px var(--textColor);
  }
  &.light-theme {
    background: var(--lightBackgroundColor);
    box-shadow: 0 0 10px var(--warningColor);
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 920px) {
    display: none;
  }
`;

export const NavbarLink = styled(NavLink)`
  color: red;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  @media (max-width: 920px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(NavLink)`
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: 400;
  position: relative;
  text-transform: uppercase;
  &.dark-theme {
    color: white;
    :not(.signup) {
      ::after {
        position: absolute;
        margin: 0 auto;
        content: "";
        border-bottom: 2px solid white;
        top: 20;
        left: 0;
        width: 100%;
        opacity: 0;
        transform: translateY(36px);
        transition: ease-in-out 0.3s all;
      }

      &:hover::after {
        opacity: 1;
        transform: translateY(25px);
      }
    }
    :nth-of-type(5) {
      border: 1px solid white;
      padding: 0.3rem 1.2rem;
      z-index: 100;
      transition: ease 0.3s all;
      border-radius: 4px;
      width: 6.7rem;
      text-align: center;
      &:hover {
        color: #302b63;
      }

      &:hover::before {
        height: 100%;
      }
      ::before {
        z-index: -100;
        margin-left: 0;
        left: 0;
        content: "";
        display: block;
        bottom: 0;
        transition: ease 0.3s all;
        width: 100%;
        position: absolute;
        height: 0%;
        background-color: white;
      }
    }
  }

  &.light-theme {
    color: #1e1e1e;
    :not(.signup) {
      ::after {
        position: absolute;
        margin: 0 auto;
        content: "";
        border-bottom: 2px solid #1e1e1e;
        top: 20;
        left: 0;
        width: 100%;
        opacity: 0;
        transform: translateY(36px);
        transition: ease-in-out 0.3s all;
      }

      &:hover::after {
        opacity: 1;
        transform: translateY(25px);
      }
    }
    :nth-of-type(5) {
      border: 1px solid #1e1e1e;
      padding: 0.3rem 1.2rem;
      z-index: 100;
      transition: ease 0.3s all;
      border-radius: 4px;
      &:hover {
        color: #fffffe;
      }

      &:hover::before {
        height: 100%;
      }
      ::before {
        z-index: -100;
        margin-left: 0;
        left: 0;
        content: "";
        display: block;
        bottom: 0;
        transition: ease 0.3s all;
        width: 100%;
        position: absolute;
        height: 0%;
        background-color: #1e1e1e;
      }
    }
  }
`;

export const NavbarLinkExtendedMobile = styled(NavLink)`
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  font-weight: 200;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  /* ::after {
    position: absolute;
    margin: 0 auto;
    content: "";
    border-bottom: 2px solid white;
    top: 20;
    left: 0;
    width: 100%;
    opacity: 0;
    transform: translateY(36px);
    transition: ease-in-out 0.3s all;
  } */
  &.light-theme {
    color: var(--backgroundColor);
    ::after {
      position: absolute;
      margin: 0 auto;
      content: "";
      border-bottom: 2px solid var(--backgroundColor);

      top: 20;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: translateY(36px);
      transition: ease-in-out 0.3s all;
    }
  }
  &.dark-theme {
    color: var(--lightBackgroundColor);
    ::after {
      position: absolute;
      margin: 0 auto;
      content: "";
      border-bottom: 2px solid var(--lightBackgroundColor);
      top: 20;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: translateY(36px);
      transition: ease-in-out 0.3s all;
    }
  }
  &:hover::after {
    opacity: 1;
    transform: translateY(30px);
  }
`;

export const ThemeBTN = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.8rem;
  box-shadow: 0 0 12px silver;
  &.dark-theme {
    color: white;

    background-color: silver;
  }
  &.light-theme {
    color: white;
    box-shadow: 0 0 12px gold;
  }
`;

export const Logo = styled.div`
  margin: 10px;
  max-width: 180px;
  height: auto;
  cursor: pointer;
  div {
    font-family: "Alfa Slab One", cursive;
    letter-spacing: 3px;
    font-size: 1.3rem;
    &.light-theme {
      color: var(--backgroundColor);
    }
    &.dark-theme {
      color: var(--lightBackgroundColor);
    }
    span {
      color: var(--warningColor);
    }
  }
`;

export const OpenLinksButton = styled.button`
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  font-size: 45px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: var(--textColor);
  @media (min-width: 920px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;

  height: calc(110vh - 5rem);
  width: 100%;
  top: 5rem;
  right: 0;
  z-index: 11;
  overflow-y: hidden;
  &.light-theme {
    background: var(--lightBackgroundColor);
  }
  &.dark-theme {
    background: var(--backgroundColor);
  }
  @media (min-width: 920px) {
    display: none;
  }
`;

export const Bar = styled.div`
  height: 2px;
  width: 30px;
  position: relative;
  z-index: -1;

  &.light-theme {
    background-color: var(--backgroundColor);
    ::after,
    ::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      transition: 0.3s ease;
      transition-property: top, bottom;
      background-color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    background-color: var(--lightBackgroundColor);
    ::after,
    ::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      transition: 0.3s ease;
      transition-property: top, bottom;
      background-color: var(--lightBackgroundColor);
    }
  }
  ::before {
    bottom: 8px;
  }
  ::after {
    top: 8px;
  }
`;

export const NavHamburger = styled.div`
  height: 50px;
  width: 50px;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
  transform: scale(0.8);
  margin-right: 20px;
  transition: 0.5s ease left;
  &.dark-theme {
    border: 3px solid var(--lightBackgroundColor);
    ::after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 3px solid var(--lightBackgroundColor);
      animation: hamburger_puls 1.5s ease infinite;
    }
  }
  &.light-theme {
    border: 3px solid var(--backgroundColor);
    ::after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 3px solid var(--backgroundColor);
      animation: hamburger_puls 1.5s ease infinite;
    }
  }
  /* ::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 3px solid var(--textColor);
    animation: hamburger_puls 1.5s ease infinite;
  } */

  @keyframes hamburger_puls {
    0% {
      opacity: 1;
      transform: scale(1);
      color: black;
    }

    100% {
      opacity: 0;
      transform: scale(1.4);
      color: black;
    }
  }

  ${"" /* ${"" /* MEDIA QUERY FOR TABLET */}

  @media only screen and (min-width: 920px) {
    display: none;
  }

  ${"" /* MEDIA QUERY FOR DESKTOP */}

  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  color: var(--textColor);
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  font-size: 1rem;
  padding: 0.8rem;
  font-weight: 200;
  background-color: transparent;
  border: none;
  border-bottom: var(--textColor) solid 0.1rem;
`;
