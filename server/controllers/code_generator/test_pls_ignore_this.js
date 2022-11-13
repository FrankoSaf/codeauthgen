const { req } = require('./input_req');

const appJsTemplate_gen = require('./frontent_appJs_full');
const frontendPackageJson = require('./frontent_packageJson');

const serverJsFull = require('./server_full');
const backendPackageJson = require('./server_packageJson');
const dotenv_gen = require('./dotenv');



appJsTemplate_gen(req, true);
frontendPackageJson(req, true);

serverJsFull(req, true);
backendPackageJson(req, true);
dotenv_gen(req, true);





const indexHtml = 
`
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
`

const indexJs = 
`import React from 'react';
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
`

require('fs').writeFile(require('path').join(__dirname, './test/client/public/index.html'), indexHtml, err=>err ? console.log(err) : null)
require('fs').writeFile(require('path').join(__dirname, './test/client/src/index.js'), indexJs, err=>err ? console.log(err) : null)





// // ${req.body.tm1_session ? `` : ''}
// // ${req.body.tm2_jwt_cookie ? `` : ''}
// // ${req.body.tm3_jwt_axios ? `` : ''}
// // 230

// // ${tm1 ? `` : ''}
// // ${tm2 ? `` : ''}
// // ${tm3 ? `` : ''}


// //Template for server.js
// const path = require('path');
// const fs = require('fs');
// const { req } = require('./input_req');
// const server_js_full = require('./server_templates/server_templatev2')

// // what we need to do before work on the template?

// // rules for server.js
// // registrationInputs will be schema
// const registrationInputs = req.body.registrationInputs

// // loginInputs will be checked when user login
// const loginInputs = req.body.loginInputs
// // the login input can not be empty
// if(loginInputs.length<1) throw console.error("the loginInputs array can not be empty")

// // 1. we need to know which input will be uesed as main-input, will be unique, required, ues it to find user in database
// const main_input = req.body.registrationInputs.filter(el=>el.main)[0]
// const mainName = main_input.name + '_' + main_input.type

// if(!main_input) throw console.error("There is no Main input in registrationInputs array");
// // console.log(main_input)

// // 2. will there be a password input?  check type == password // 3. will user want to encrypt the password? password will always be encrypted
// const pw = req.body.registrationInputs.filter(el=>el.type.toLowerCase()=='password')[0]
// let pwName;
// if(pw) pwName = pw.name + '_' + pw.type

// // 3. if user set nodemailer is true, that means he want verify his user's email. that require there is a "email" in registrationInputs
// let emailName = 'email'
// if (req.body.nodemailer) {
//   if(req.body.nodemailerSetting.pass && req.body.nodemailerSetting.user && req.body.nodemailerSetting.senderEmail ) {
//     if (!req.body.registrationInputs.some(el => el.type == 'email')) console.error("if user want nodemailer, need to have type email in registrationInputs")
//     else {
//       const emailInput = req.body.registrationInputs.filter(el=>el.type.toLowerCase()=='email')[0]
//       emailName = emailInput.name + '_' + emailInput.type
//     }
//   } else console.error("if user want nodemailer, need to provide username, password, sender's email")
// }

// // how should we know do we need bcrypt or not bcrypt => bt
// let bt = false;
// // 1 if pw is true, bt is true
// if(pw) bt = true;
// // nodemailer need to use bcrypt
// else if(req.body.nodemailer) bt = true
// // 2 else if req.body.packages.filter(x=>x='bcrypt') is true, bt is also true
// else if(req.body.packages.filter(x=>x='bcrypt')[0]) bt = true



// server_js_full


// // empty space only appears above comments without space
// // delete empty lines, if the line is start with some comments, will add a new line 
// template = template.split("\n").map(x=>{
//     if(x[0] == '/' && x[1] =='/') x="\n"+x;
//     return x;
// }).filter(x=>x).join("\n").trim()

// fs.writeFile(path.join(__dirname, 'server.js'), template, (err) => {
//   if (err) throw err;
// });
