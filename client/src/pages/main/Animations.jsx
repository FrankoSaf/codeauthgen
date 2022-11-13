import React, { useContext } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiMaterialui,
  SiStyledcomponents,
  SiReactrouter,
  SiExpress,
  SiPassport,
  SiMongodb,
} from "react-icons/si";
import styled from "styled-components";
import { Context } from "../../store/Context";

export default function Animations() {

  const {darkTheme} = useContext(Context);
  return (
    <>
      <LogoDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <div className="logo" style={{ animationDelay: "-0s" }}>
          <SiMaterialui />
        </div>
        <div className="logo" style={{ animationDelay: "-4s" }}>
          <SiStyledcomponents />
        </div>
        <div className="logo" style={{ animationDelay: "-8s" }}>
          <SiReactrouter />
        </div>
        <div className="logo" style={{ animationDelay: "-12s" }}>
          <FaNodeJs  />
        </div>
        <div className="logo" style={{ animationDelay: "-16s" }}>
          <SiExpress />
        </div>
        <div className="logo" style={{ animationDelay: "-20s" }}>
          <SiPassport  />
        </div>
        <div className="logo" style={{ animationDelay: "-24s" }} >
          <SiMongodb />
        </div>
        <div  className="logo" style={{ animationDelay: "-28s" }}>
          <FaReact />
        </div>
      </LogoDiv>
    </>
  );
}

const LogoDiv = styled.div`
  * {
    grid-column: 1;
    grid-row: 1;
  }
  display: grid;
  justify-content: center;
  align-content: center;
  border-radius: 100%;
  height: 100%;
  width: 100%;
  .logo {
    animation: spinAround 32s linear infinite;
    align-self: center;
    justify-self: center;
    display: block;
    font-size: 3.5rem;
    svg {
      animation: rotate 16s linear infinite;
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  @keyframes spinAround {
    from {
      transform: rotate(0deg) translate(150px);
    }
    to {
      transform: rotate(360deg) translate(150px);
    }
  }
`;
