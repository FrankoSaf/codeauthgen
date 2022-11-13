/** 
 * generator frontend package.json(React)'s code all in one file
 * @req request from frontend method:post
 * @file need create a file ? default is false
 * @filePath relative path to save/update the server.js .Defalt is './test/client/package.json')
 * @return string format of code of package.json
 */
 const frontendPackageJson = (req, file = false, filePath = './test/client/package.json') =>{

  let frontendPackage_json = `{
  "name": "${req.body.project_name}_cline",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "react": "^18.2.0",
  "axios": "*",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
  },
  "scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
  },
  ${req.body.template=="tm1_session" ? `"proxy": "${req.body.backendOrigin+req.body.port}",` : ``}
  "eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
  },
  "browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
  }
  }`;
  
  const trimEmptyLine =require('./tools/trimEmptyLine')
  frontendPackage_json = trimEmptyLine(frontendPackage_json)
  
  if(file) {
    const path = require('path');
    const fs = require('fs');
        fs.writeFile(path.join(__dirname, filePath ), frontendPackage_json, (err) => {
            if (err) throw err;
            });
  }
  
  return frontendPackage_json
  }
  
  module.exports=frontendPackageJson