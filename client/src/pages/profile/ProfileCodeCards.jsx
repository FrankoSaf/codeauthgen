import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { Context } from "../../store/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BiShow } from "react-icons/bi";
import { BsTrash, BsDownload } from "react-icons/bs";
import { baseUrl } from "../../assets/api/api";
const ProfileCodeCards = () => {
  const [cards, setCards] = useState([]);
  const { setProfileTemplates, finalDataToSend } = useContext(Context);

  console.log(finalDataToSend);
  // set root json filev
  const rootJson = `{
    "name": "lazy_devs",
    "version": "1.0.0",
    "description": "user authentication template",
    "main": "",
    "scripts": {
      "start": "concurrently \\"npm run server\\" \\"npm run client\\"",
      "install_both": "concurrently \\"npm run i_server\\" \\"npm run i_client\\"",
      "i_server": "npm install --prefix server",
      "i_client": "npm install --prefix client",
      "server": "npm start --prefix server",
      "client": "npm start --prefix client"
    },
    "author": "sufaz",
    "license": "MIT",
    "dependencies": {
      "concurrently": "*"
    }
  }`;

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${baseUrl}/user/templates`);
        setCards(data.data.template);
        console.log(data.data.template);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  console.log();
  const showTemplateHandler = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/user/templates/${id}`);
      setProfileTemplates(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSavedTempHandler = async (id) => {
    try {
      const data = await axios.delete(`${baseUrl}/user/templates/${id}`);
      setCards((pre) => pre.filter((item) => item._id !== data.data._id));
    } catch (error) {}
  };
  const download = async (id) => {
    console.log(id);
    try {
      const data = await axios.get(`${baseUrl}/user/templates/download/${id}`);
      const zip = new JSZip();
      console.log(data.data);
      zip.folder(data.data.templateName).file("package.json", rootJson);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("src")
        .file("App.js", data.data.frontend);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("src")
        .file("index.js", indexJs);
      zip
        .folder(data.data.templateName)
        .folder("client")
        .folder("public")
        .file("index.html", indexHtml);
      zip
        .folder(data.data.templateName)
        .folder("server")
        .file("server.js", data.data.backend);

      zip
        .folder(data.data.templateName)
        .folder("client")
        .file("package.json", data.data.frontEndPackageJSON);

      zip
        .folder(data.data.templateName)
        .folder("server")
        .file("package.json", data.data.backendPackageJSON);
      zip
        .folder(data.data.templateName)
        .folder("server")
        .file(".env", data.data.backendDotenv);

      zip
        .generateAsync({
          type: "blob",
        })
        .then((content) => {
          saveAs(content, data.data.templateName);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProfileCodeCardsWindow>
      {cards.length > 0 && (
        <h3 style={{ margin: "2rem 0 1rem" }}>Your previous work:</h3>
      )}
      {cards.map((card, index) => {
        return (
          <>
            <CodeCardBox>
              <p>{card.templateName}</p>
              <div style={{ width: "50%" }}>
                <div>
                  <Download
                    onClick={() => download(card._id)}
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  />
                </div>
                <div onClick={() => showTemplateHandler(card._id)}>
                  <Show style={{ fontSize: "30px", fontWeight: "bold" }} />
                </div>
                <div onClick={() => deleteSavedTempHandler(card._id)}>
                  <Trash style={{ fontSize: "30px", fontWeight: "bold" }} />
                </div>
              </div>
            </CodeCardBox>
            <CreatedAt>{moment(card.createdAt).fromNow()}</CreatedAt>
          </>
        );
      })}
    </ProfileCodeCardsWindow>
  );
};

export default ProfileCodeCards;

const ProfileCodeCardsWindow = styled.div`
  display: flex;
  flex-direction: column;
  width: 17rem;
  span {
    font-size: 14px;
    font-style: italic;
    color: white;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
`;
const CodeCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  background: #3cc6ad;
  border-radius: 0.5rem;
  flex-basis: 1;
  position: relative;
  cursor: pointer;
  p {
    font-size: 16px;
    max-width: 50%;
    overflow: hidden;
  }
  div {
    display: flex;
    width: 5rem;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
  }
`;
const Show = styled(BiShow)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const Trash = styled(BsTrash)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;
const Download = styled(BsDownload)`
  transition: all 0.2s;
  &:hover {
    color: #fca311;
    transform: scale(1.1);
  }
`;

const CreatedAt = styled.span`
  margin-top: 0.3rem;
  font-size: 0.5rem;
`;

const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>lazy devs</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
`;

const indexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
`;
