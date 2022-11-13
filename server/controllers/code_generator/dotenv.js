/** 
 * generator backend .env's code all in one file
 * @req request from frontend method:post
 * @file need create a file ? default is false
 * @filePath relative path to save/update the server.js .Defalt is './test/server/.env')
 * @return string format of code of .env
 */
 const dotenv_gen = (req, file = false, filePath = './test/server/.env') =>{
    let dotenvTemplate =
    `
    # feel free to change these settings 
    
    # server port default 5000
    PORT=${req.body.port}
    
    # mongoDB link default localhost
    MONGODB=${req.body.mongodbURI}/${req.body.project_name.split(' ').join('_')}
    
    ${req.body.backend_packages.nodemailer? `# email smtp user default mailtrap 
    EMAIL_USER=${req.body.nodemailerSetting?.user ? req.body.nodemailerSetting.user  : `'This setting for Nodemailer is required'`} 
    
    # email smtp pass default mailtrap 
    EMAIL_PASS=${req.body.nodemailerSetting?.pass ?  req.body.nodemailerSetting.pass : `'This setting for Nodemailer is required'`} 
    
    SENDER=${req.body.nodemailerSetting?.senderEmail ? req.body.nodemailerSetting.senderEmail  : `'This setting for Nodemailer is required'`}` : ''}
    
    
    # secret key for keeping secret
    SECRETKEY="${req.body.secretKey}"
    `
    
    const trimEmptyLine =require('./tools/trimEmptyLine')
    dotenvTemplate = trimEmptyLine(dotenvTemplate)
    
    if(file) {
        const path = require('path');
        const fs = require('fs');
            fs.writeFile(path.join(__dirname, filePath ), dotenvTemplate, (err) => {
                if (err) throw err;
                });
    }
            
    return dotenvTemplate
    
    }
    
    
    module.exports=dotenv_gen
    