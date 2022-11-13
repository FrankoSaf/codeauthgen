exports.req = {
    body: {
        backend_packages: {
            nodemailer: true,
            dotenv: true,
            bcrypt:true,
            nodemon:true,
            jsonwebtoken:false,
            "express-session":true,
            "cookie-parser":true
        },  
        frontend_packages: {
            axios: true,

        },
        
        template: "tm2_jwt_cookie", // tm1_session ,  tm2_jwt_cookie , tm3_jwt_axios

        project_name:'lazy_dev',
        project_description: 'user authentication template',
        project_author:'',
        project_license: 'MIT',
        secretKey: 'nice',  // default = "test"
        expireTime: 2592000000, // in millisecond default = 30days // data type must be number
        port:5000, // server port
        frontendOrigin: 'http://localhost:3000',  //default = http://localhost:3000
        backendOrigin:'http://localhost:', 
        mongodbURI:"mongodb://localhost:27017",

        nodemailerSetting: {
            host: "",   // default is mailtrap
            port: "",   // default is mailtrap
            user: "4ef2ce46e27fd8",  //  required
            pass: "df33486a36f2ae",  //  required
            senderEmail: "info@lazyDev.com" //  required
        },
      
        registrationInputs: [
            { required: false, unique: false, name: 'ko', type: 'text' },
            { required: false, unique: true, name: 'password', type: 'number' },
            { required: true, unique: true, name: 'fran', type: 'email', main: true },
            { required: false, unique: false, name: 'password', type: 'password' }
        ],
        loginInputs: [
            { required: true, unique: true, name: 'fran', type: 'email', main: true },
        ],
        mongoConnectMessage: '',
        serverListenMessage: '',    
    },
};



tree = {
    frontend: {
        public: [
            {index_html: ''}
        ],
        src: [ {
            componentName:'home'
        } ],
        app_js: '',
        index_js:'',
        package_json: ''
    }
}




// backups
// const formSetting = {
//     inputs: [{ required: false, unique: false, name: 'fran', type: 'email' }], 
//     packages: [],
//     frontend: { 
//         NavBarComponent: true, HomeComponent: true, RegisterComponent: true, LoginComponent: true, ErrorPageComponent: true, session: true, jwt: true, dotenv: true, nodemailer: true, expressValidator: true 
//         } 
//     } 


//     schemaInputs: [
//         { name: 'name', type: "String", required: true, inputType: 'email' },
//         {
//             name: 'city',
//             type: "String",
//             required: 'true',
//             inputType: 'name',
//             minLength: 18,
//             maxLength: 25,
//         },
//         { name: 'age', type: "Number", required: false, minLength: 18, maxLength: 25 },
//         {
//             name: 'zipcode',
//             type: "String",
//             required: 'true',
//             inputType: 'password',
//         },
//     ]

// old default Schema
// email: {
    //     type: String,
    //     unique: true,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // verify: {
    //     email: {
    //         type: Boolean,
    //         default: false
    //     },
    //     token: String
    // },
    // secretKey: {
    //     type: String
    // }