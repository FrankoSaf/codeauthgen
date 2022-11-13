import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../../store/Context.js";
import Editor from "@monaco-editor/react";

const CodeTemplate = ({ temp }) => {
  const { templates, darkTheme } = useContext(Context);
  const options = {
    readOnly: false,
    minimap: { enabled: true },
    wordWrap: "on",
    formatOnType: true,
  };

  // SAVE TEMPLATE TO LOCALHOST
  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  return (
    <Main className={darkTheme ? "dark-theme" : "light-theme"}>
      <CodeblockDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <h3>Backend - server/server.js</h3>
        <Editor
          height="60vh"
          width="100%"
          defaultLanguage="javascript"
          theme={darkTheme ? "vs-dark" : "light"}
          value={temp?.backend}
          options={options}
          lineNumbers="off"
        />
      </CodeblockDiv>
      <CodeblockDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <h3>Frontend - client/src/App.js</h3>
        <Editor
          height="60vh"
          width="100%"
          defaultLanguage="javascript"
          theme={darkTheme ? "vs-dark" : "vs-light"}
          value={temp?.frontend}
          options={options}
        />
      </CodeblockDiv>
      <CodeblockDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <h3>Backend - server/package.json</h3>
        <Editor
          height="40vh"
          width="100%"
          defaultLanguage="json"
          theme={darkTheme ? "vs-dark" : "vs-light"}
          value={temp?.backendPackageJSON}
          options={options}
        />
      </CodeblockDiv>
      <CodeblockDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <h3>Fontend - client/package.json</h3>
        <Editor
          height="40vh"
          width="100%"
          defaultLanguage="json"
          theme={darkTheme ? "vs-dark" : "vs-light"}
          value={temp?.frontEndPackageJSON}
          options={options}
        />
      </CodeblockDiv>
      <CodeblockDiv className={darkTheme ? "dark-theme" : "light-theme"}>
        <h3>Backend - server/.env</h3>
        <Editor
          height="30vh"
          width="100%"
          defaultLanguage="python"
          theme={darkTheme ? "vs-dark" : "vs-light"}
          value={temp?.backendDotenv}
          options={options}
        />
      </CodeblockDiv>
    </Main>
  );
};

export default CodeTemplate;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 1rem;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    background-color: white;
    &.dark-theme {
      background-color: var(--backgroundColor);
    }
  }
`;

const CodeblockDiv = styled.div`
  width: 100%;
  margin: 1rem auto;
  &.light-theme {
    h3 {
      color: var(--backgroundColor);
    }
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  @media (max-width: 900px) {
    width: 80%;
    background-color: white;
    &.dark-theme {
      background-color: var(--backgroundColor);
    }
  }
`;
