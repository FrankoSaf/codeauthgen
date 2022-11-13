/** 
 * generator backend package.json's code all in one file
 * @req request from frontend method:post
 * @file need create a file ? default is false
 * @filePath relative path to save/update the server.js .Defalt is './test/server/package.json')
 * @return string format of code of package.json
 */
 const backendPackageJson = (req, file = false, filePath = './test/server/package.json') =>{

  const newArr = [];
  for (let key in req.body.backend_packages) {
    if (req.body.backend_packages[key]) newArr.push(key);
  }
  
  let backendPackage_json = `
  {
        "name": "${req.body.project_name}_server",
        "version": "1.0.0",
        "description": "${req.body.project_description}",
        "main": "server.js",
        "scripts": {
            "start": "${req.body.backend_packages.nodemon? `nodemon` : `node`} server.js"
        },
        "author": "${req.body.project_author}",
        "license": "${req.body.project_license}",
        "dependencies": {
            "express": "*",
            "mongoose": "*",
            "cors": "*"${newArr.length > 0 ? ',' : ''}
          ${newArr
              .map((item, i) => {
                return `  "${item}": "*"`;
              }).join(',\n        ')}
        }
  }`;
  
  
  const trimEmptyLine =require('./tools/trimEmptyLine')
  backendPackage_json = trimEmptyLine(backendPackage_json)
  
  if(file) {
      const path = require('path');
      const fs = require('fs');
          fs.writeFile(path.join(__dirname, filePath ), backendPackage_json, (err) => {
              if (err) throw err;
              });
  }
          
  return backendPackage_json
  
  }
  
  module.exports=backendPackageJson
  
  