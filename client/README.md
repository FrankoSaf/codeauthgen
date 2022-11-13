# form-generator-sufaz

# current input
```js
req = {
    body: {
        backend_packages: {
        // Add to frontend form
            nodemailer: false,
            dotenv: true,
            bcrypt:true,
            // steel need to be discussed
            nodemon:true,
        }, 
        frontend__packages: {
        },
        // add to frontend form --> VERY IMNPORTANT add as a string
        template: "tm1_session", // tm1_session ,  tm2_jwt_cookie , tm3_jwt_axios
        // add to frontend form -->  need to descuss which ones we want to let user to choose
        project_name:'lazy_dev',
        project_description: 'user authentication template',
        project_author:'',
        project_license: 'MIT',
        secretKey: 'nice',  // default = "test"
        expireTime: 2592000000, // in millisecond default = 30days // data type must be number
        port:5000, // server port
        frontendOrigin: '',  //default = *
        backendOrigin:'http://localhost:', 
        mongodbURI:"mongodb://localhost:27017",
       // If user want nodemailer --> need to add to frontend form
        nodemailerSetting: {
            host: "",   // default is mailtrap
            port: "",   // default is mailtrap
            user: "",  //  required
            pass: "",  //  required
            senderEmail: "" //  required
        },
      
        registrationInputs: [
            { required: true, unique: true, name: 'fran', type: 'email', main: true },
            { required: false, unique: false, name: 'ko', type: 'username' },
            { required: false, unique: false, name: 'password', type: 'password' },
            { required: false, unique: true, name: 'password', type: 'number ' }
        ],
        loginInputs: [
            { required: true, unique: true, name: 'fran', type: 'email', main: true },
        ],
        mongoConnectMessage: '',
        serverListenMessage: '',    
    },
};
```

## franko heeeere

## hi love

