const appJsTemplate_gen = require('./code_generator/frontent_appJs_full');
const frontendPackageJson = require('./code_generator/frontent_packageJson');
const serverJsFull = require('./code_generator/server_full');
const backendPackageJson = require('./code_generator/server_packageJson');
const dotenv_gen = require('./code_generator/dotenv');
const configReqBody = require('./code_generator/configReqBody');
const ExpressError = require('../ExpressError');

exports.generateController = async (req, res, next) => {
  // config req.body
  req.body = configReqBody(req.body);

  try {
    // need to create folders before saving the files
    const frontEndTemplate = appJsTemplate_gen(req, false, '../codeTemplates/client/src/App.jsx');
    const frontendPackage_json = frontendPackageJson(req, false, '../codeTemplates/client/src/package.json');

    const backendTemplate = serverJsFull(req, false, '../codeTemplates/server/template1.js');
    const backendPackage_json = backendPackageJson(req, false, '../codeTemplates/server/package.json');
    const backendDotenv = dotenv_gen(req, false, '../codeTemplates/server/.env');

    const templates = {
      frontend: frontEndTemplate,
      backend: backendTemplate,
      frontEndPackageJSON: frontendPackage_json,
      backendPackageJSON: backendPackage_json,
      backendDotenv: backendDotenv,
    };
    //sending templates to frontend
    req.session.template = templates;
    req.session.save((err) => {
      if (err) throw err;
      res.send(templates);
    });
  } catch (err) {
    console.log(err);
    next(new ExpressError());
  }

  // to create index.js and index.html
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
    <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> -->
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <!-- <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> -->
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
    <title>Auth Code Gen</title>
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

  // require('fs').writeFile(
  //   require('path').join(__dirname, './codeTemplates/client/public/index.html'),
  //   indexHtml,
  //   (err) => (err ? console.log(err) : null)
  // );
  // require('fs').writeFile(
  //   require('path').join(__dirname, './codeTemplates/client/src/index.js'),
  //   indexJs,
  //   (err) => (err ? console.log(err) : null)
  // );
};

exports.renderController = async (req, res, next) => {
  try {
    res.json({ code: req.session.template, user: req.session.user });
  } catch (err) {
    console.log(err);
  }
};
