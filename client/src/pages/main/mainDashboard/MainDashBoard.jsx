import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../store/Context";
import Alert from "../../../components/UI/Alert";
import Editor from "./EditorForm";
import CodeTemplate from "./CodeTemplate";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function MainDashBoard() {
  const { templates, darkTheme } = useContext(Context);

  const [spread, setSpread] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const spreadSidebar = () => {
    setSpread((pre) => !pre);
  };
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      console.log("updating width");
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  return (
    <DashBoardContainer>
      <MainContentContainer>
        {!spread && (
          <EditorDiv className={darkTheme ? "dark-theme" : "light-theme"}>
            {templates?.backend && !spread && screenWidth < 900 && (
              <SpreadButton
                onClick={spreadSidebar}
                className={darkTheme ? "dark-theme" : "light-theme"}
              >
                {spread ? <IoIosArrowBack /> : <IoIosArrowForward />}{" "}
              </SpreadButton>
            )}
            <Editor id="editor" />
          </EditorDiv>
        )}
        {spread || screenWidth > 900 ? (
          <TemplatesDiv
            className={darkTheme ? "dark-theme" : "light-theme"}
            style={!spread ? { display: "block", width: "100%" } : {}}
          >
            {spread && (
              <SpreadButton
                onClick={spreadSidebar}
                className={darkTheme ? "dark-theme" : "light-theme"}
                style={{ left: "0", right: "100%" }}
              >
                {" "}
                {spread ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </SpreadButton>
            )}
            {templates?.backend ? (
              <CodeTemplate id="codeTemplate" temp={templates} />
            ) : (
              <></>
            )}
          </TemplatesDiv>
        ) : (
          <></>
        )}
      </MainContentContainer>
      <Alert>
        {templates ? "Template successfully saved!" : "Template already exists"}
      </Alert>
    </DashBoardContainer>
  );
  // {spread && (
  //   <CloseButton
  //     onClick={spreadSidebar}
  //     className={darkTheme ? "dark-theme" : "light-theme"}
  //   ></CloseButton>
  // )}
}

// ## STYLED COMPONENTS ##

const DashBoardContainer = styled.div`
  position: relative;
`;

const MainContentContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  position: relative;
`;

const EditorDiv = styled.div`
  align-self: flex-start;
  flex-basis: 320px;
  transition: width 1s;
  border-right: 1px solid white;
  @media screen and (max-width: 900px) {
    border-right: none;
    position: relative;
    flex: 1;
    width: 100%;
    & input,
    & select {
      width: 100%;
    }
  }
`;

const TemplatesDiv = styled.div`
  position: relative;
  flex: 1;
  &.dark-theme {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
  &.light-theme {
    background-color: var(--textColor);
    color: var(--textColor);
  }
`;

const SpreadButton = styled.button`
  position: fixed;
  top: 50%;
  right: 0;
  color: white;
  animation: pulse 1s infinite;
  border: none;
  background: transparent;
  font-size: 3rem;
  background-color: transparent;
  cursor: pointer;
  &.dark-theme {
    color: white;
    background-color: var(--backgroundColor);
  }
  &.light-theme {
    color: var(--backgroundColor);
    background-color: var(--textColor);
  }
  @keyframes pulse {
    from {
      transform: translateX(-2px);
    }
    to {
      transform: translateX(0);
    }
  }
`;
