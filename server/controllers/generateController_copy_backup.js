const fs = require("fs");
const path = require("path");
// const { frontEndTemplate } = require("../../reactMainTemplate");
exports.generateController = async (req, res, next) => {
  try {
    const backendTemplate = `const express=require('express');
  const mongoose=require('mongoose');
  const cors=require('cors');${
    req.body.bcrypt ? "\nconst bcrypt = require('bcrypt');" : ``
  }${req.body.nodemailer ? "\nconst nodemailer=require('nodemailer');" : ``}${
      req.body.jwt ? "\nconst jwt = require('jsonwebtoken');" : ``
    }${
      req.body.expressValidator
        ? "\nconst {check,validationResult}=require('express-validator')"
        : ""
    }
  const app = express()
  const { isEmail } = require('validator');${
    req.body.session ? "\nconst session=require('express-session');" : ``
  }${req.body.dotenv ? "\nrequire('dotenv').config();" : ``}
  
  const PORT=process.env.PORT || 6666;
  const DB_LINK=${
    req.body.dotenv
      ? "process.env.DB_LINK"
      : '"mongodb://localhost:27017/templateDemo"'
  };
  // CUSTOMIZED ERROR HANDLER
  class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
    }
  }
  
  mongoose.connect(DB_LINK,(err)=>{
      if(err) throw err
      console.log('Database connected')
  })
  app.use(cors(${
    req.body.jwt ? "{credentials:true, origin: frontendOrigin}" : ""
  }))
  app.use(express.json())
  app.use(session(
      {
          secret: "test",
          resave:false,
          saveUninitialized: true,
          cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // time period for session data(e.g. store data for 30 day)
      }
  ))
  const userRouter = express.Router()
  
  //Schema
  const {Schema,model}= require('mongoose')
  const userSchema = new Schema({
    ${req.body.inputs
      .map((item) => {
        return `${item.name}:{\n    type:${
          (typeof item.type)[0].toUpperCase() + (typeof item.type).slice(1)
        },\n    required:${item.required},\n    unique:${
          item.unique === true ? "true," : "false,"
        }${
          item.name === "email"
            ? `\n    validate:[isEmail,'Invalid Email']`
            : ""
        }},\n`;
      })
      .join("")}${req.body.nodemailer ? `\n   verified:false` : ""}
  })
  const User = mongoose.model('User',userSchema)${
    req.body.nodemailer
      ? `\n//NODEMAILER VERIFICATION
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 25 || 465 || 587 || 2525,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

const emailSender = async (mailTo, userId) => {
  try {
    await transporter.sendMail({
      from: '"Hello from us" <authentication-generator@outlook.com>', // sender address
      to: mailTo, // list of receivers
      subject: 'Please verify your email address', // Subject line
      text: 'Hello world?', // plain text body
      html: ${`<p>Thank you for registering, to prevent spam accounts, please follow this <a href="http://localhost:5000/authentication/verify/${userId}">link</a><p>`}, // html body
    });
  } catch (err) {
    throw new ExpressError(err);
  }
};`
      : ""
  }${
      req.body.expressValidator
        ? `\n
      //MIDDLEWARES
      const userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (result.length !== 0) {
      throw new ExpressError(result, 300);
    } else {
      next();
    }
  }`
        : ""
    }${
      req.body.expressValidator
        ? `\nconst userValidator=[\n${req.body.inputs
            .map((item) => {
              console.log(item.type);
              return item.type
                ? `     check("${item.name}")${
                    item.required === "true" ? "" : ".optional()"
                  }${
                    item.type === "string"
                      ? `.isString().isLength({${
                          item.min ? `min:${item.min},` : ""
                        }${item.max ? `max:${item.max}` : ""}}),\n`
                      : `.isInt({${item.min ? `min:${item.min},` : ""}${
                          item.max ? `max:${item.max}` : ""
                        }}),\n`
                  }${
                    item.type === "email"
                      ? `.normalizeEmail({ gmail_remove_dots: false }).isEmail({}).withMessage('Invalid email address')
      .custom(async (val) => {
        const user = await User.findOne({ email: val });
        if (user) {
          throw new ExpressError('Email address already in use', 409);
        } else {
          return true;
        }
      })${item.required === true ? "" : ","}`
                      : `${
                          item.type === "password"
                            ? `.isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),`
                            : item.name === "passwordConfirm"
                            ? `.exists({ checkFalsy: true })
                          .withMessage('Please confirm your password')
                          .custom((val, { req }) => {
                            if(val === req.body.password) return true
                            else throw new ExpressError('Passwords do not match', 300);
                          })
                          `
                            : ""
                        }`
                  }${
                    item.type !== "number" && item.type !== "email"
                      ? `.isString().isLength({${
                          item.min ? `min:${item.min}` : ""
                        }${item.max ? `max:${item.max}` : ""}}),\n`
                      : item.type === "email"
                      ? ""
                      : `.isInt({${item.min ? `min:${item.min},` : ""}${
                          item.max ? `max:${item.max}` : ""
                        }}),\n`
                  }`
                : ``;
            })
            .join("")}]`
        : ""
    }
  
  //REGISTER CONTROLLER
  const registrationController=async(req, res, next)=>{
      const user=req.body;
      try{
      const newUser=await User.findOne({email: user.email})
          if(newUser){
              throw new ExpressError('Email already in use',300)
          }else{
              ${
                req.body.bcrypt
                  ? `const salt=await bcrypt.genSalt(10)
              const hash=await bcrypt.hash(user.password,salt)
              user.password=hash
              const userEmailId=await bcrypt.hash(user._id,salt)
              `
                  : ""
              }
             const result=await User.create(user)
             ${
               req.body.nodemailer
                 ? `emailSender(user.email, ${
                     req.body.bcrypt ? `userEmailId` : `user._id`
                   });
             req.session.user = await User.findOne({ email: user.email }).select(
               '-password' );`
                 : `
                 ${
                   req.body.session
                     ? `req.session.user = await User.findOne({ email: user.email }).select(
                      '-password' );
                      req.session.save()
                      `
                     : `${
                         req.body.jwt
                           ? `const token=jwt.sign(user,${
                               req.body.dotenv
                                 ? "process.env.JWT_KEY"
                                 : "testSecretKey"
                             },{algorithm: 'HS256', expiresIn: '1h'}
                     )
                     res
                     .cookie('token', token, {
                       expires: new Date(Date.now() + 172800000),
                       sameSite: config.env == 'production' ? 'None' : 'lax',
                       secure: config.env == 'production' ? true : false, //http on localhost, https on production,
                       httpOnly: true,
                     })
                     .send(user);
                     `
                           : ``
                       }`
                 }
                 `
             }
             res.send('User registered')
  }
  }catch(err){
    next(new ExpressError())
  }
  }
  
  //LOGIN CONTROLLER
  const loginController=async(req,res,next)=>{
    const {email,password}= req.body;
    try{
    const user= await User.findOne({email:email,password:password});
    if(user){
      if(${
        req.body.bcrypt
          ? "bcrypt.compare(user.password,password)"
          : "user.password===password"
      }){
    const loggedUser= await User.findOne({email:email}).select('-password')
    ${
      req.body.session
        ? `req.session.user=loggedUser\n
        res.send('Successful login')
        `
        : req.body.jwt
        ? `const token=jwt.sign(loggedUser,${
            req.body.dotenv ? process.env.SECRET_KEY : "loginsecretkey"
          },{expiresIn:'15m'})
          req.cookies.token=token
          res.json(token)
          `
        : `res.json(loggedUser)`
    }
      }else{
        throw new ExpressError('Invalid credentials',300)
      }
    }else{
      throw new ExpressError('Invalid credentials',300)
    }
  }catch(err){
    next(new ExpressError())
  }
  }
  

  //ROUTES
  app.post('/register'${
    req.body.expressValidator ? ",userValidator,userValidation" : ""
  },registrationController);
  app.post('/login',loginController)
  
  app.use((err, req, res, next) => {
    const { message = 'Something went wrong', status = 500 } = err;
    res.status(status).send(message);
  });
  
  app.listen(PORT, (err)=>{
      if(err) throw err
      console.log('Listening on port'+PORT)
  })
  
  
  `;

    // console.log(__dirname);

    // ## package json template ##

    const newArr = [];
    for (let key of req.body.packages) {
      if (Object.values(key)[0] === true) newArr.push(Object.keys(key));
    }


    const backendPackage_json = `
  {
      "name": "my_app",
      "version": "1.0.0",
      "description": "user authentication template",
      "main": "server.js",
      "scripts": {
          "start": "nodemon server.js"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
          "express": "*",
          "mongoose": "*",
          "cors": "*"${newArr.length > 0 ? "," : ""}
          ${newArr
            .map((item, i) => {
              return `"${item}": "*"`;
            })
            .join(",\n        ")}
  
  
      }
    }`;

    // ## react template ##
    const frontEndTemplate = `import ReactDOM from "react-dom/client";
         import React, { useEffect, useState } from 'react';
         import { Routes, Route, useNavigate, BrowserRouter, NavLink } from 'react-router-dom';
   import axios from "axios";${
     req.body.frontend?.NavBarComponent ? "\n// import NavBar from '';" : ""
   }${
      req.body.frontend?.RegisterComponent
        ? "\n// import Register from '';"
        : ""
    }${req.body.frontend?.LoginComponent ? "\n// import Login from '';" : ""}${
      req.body.frontend?.ErrorPageComponent
        ? "\n// import ErrorPage from '';"
        : ""
    }${req.body.frontend?.HomeComponent ? "\n// import Home from '';" : ""} 

// ## index.js file ##
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter> 
        <App />
      </BrowserRouter>  
  </React.StrictMode>
);
    


// When using out of this file add "export default" before "function App()..."
function App() {

  return (
    <div>
      ${req.body.frontend?.NavBarComponent ? "<NavBar />" : ""}
     <Routes>
      ${
        req.body.frontend?.HomeComponent
          ? `\n<Route path='/' element={<Home />} />`
          : ""
      }${
      req.body.frontend.RegisterComponent
        ? `\n<Route path='/register' element={<Register />} />`
        : ""
    }${
      req.body.frontend.LoginComponent
        ? `\n<Route path='/login' element={<Login />} />`
        : ""
    }${
      req.body.frontend?.ErrorPageComponent
        ? `\n<Route path='*' element={<ErrorPage />} />`
        : ""
    }
     </Routes>  
    </div>
  );
}

${
  req.body.frontend?.NavBarComponent
    ? `
// ## NavBar_Component #

// When using out of this file add "export default" before "function NavBar()..."
function NavBar() {

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}
`
    : ""
}

${
  req.body.frontend?.HomeComponent
    ? `
// ## Home Component ##

// When using out of this file add "export default" before "function Home()..."
function Home() {

  return (
    <div>Home</div>
  );
}
`
    : ""
}

${
  req.body.frontend?.ErrorPageComponent
    ? `
// ## ErrorPage Component ##

// When using out of this file add "export default" before "function ErrorPage()..."
function ErrorPage() {

  return (
    <div>Error</div>
  );
}
`
    : ""
}

${
  req.body.frontend?.RegisterComponent
    ? `
// ## Registration Component ## 

// When using out of this file add "export default" before "function Register()..."
function Register() {
  const navigate = useNavigate();

  const [userRegisterInput, setUserRegisterInput] = useState({});

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post("/register", userRegisterInput)
      .then((result) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error)
        });
  };

  const onChangeHandler = (e) => {
     const inputValue = e.target.value;
     setUserRegisterInput((prev) => {
       return {
         ...prev,
         [e.target.name]: inputValue,
       };
     });
   };

  return (
    <form onSubmit={registerHandler}>
       <div>
      ${req.body.registrationInputs
        .map((input) => {
          return `
          <label htmlFor="${input.id ? `${input.id}` : ""}">${
            input.name
          }</label>
          <input ${input.event ? `${input.event}={onChangeHandler}` : ""} ${
            input.type ? `type="${input.type}"` : ""
          } ${input.placeholder ? `placeholder="${input.placeholder}"` : ""} ${
            input.name ? `name="${input.name}"` : ""
          }${input.required ? ` required` : ""} />`;
        })
        .join("\n      ")}
       </div>
       <button type="submit" value="Register">
         Register
       </button>  
    </form>
  );
}
`
    : ""
}

${
  req.body.frontend?.LoginComponent
    ? `
// ## Login Component ##

// When using out of this file add "export default" before "function Register()..."
function Login() {

  const navigate = useNavigate();
  const [userLoginInput, setUserLoginInput] = useState({});

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserLoginInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue,
      };
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("/login", userLoginInput)
      .then((result) => {
        console.log(result.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (

    <div>
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
      <div>
      ${req.body.loginInputs
        .map((input) => {
          return `
          <label htmlFor="${input.id ? `${input.id}` : ""}">${
            input.name
          }</label>
          <input ${input.event ? `${input.event}={onChangeHandler}` : ""} ${
            input.type ? `type="${input.type}"` : ""
          } ${input.placeholder ? `placeholder="${input.placeholder}"` : ""} ${
            input.name ? `name="${input.name}"` : ""
          }${input.required ? ` required` : ""} />`;
        })
        .join("\n      ")}
       </div>
        <button type="submit" value="Login">
          Login
        </button>
      </form>
    </div>
  );
}
`
    : ""
}
`;

    const newFrontendArr = [];

    for (let key in req.body.frontEnd) {
      if (req.body.frontEnd[key] === true) newArr.push(key);
    }

    const frontendPackage_json = `{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-router-dom": "^18.2.0",
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
  "proxy": "http://localhost:6666",
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
    // write package json file
    fs.writeFile(
      path.join(__dirname, "/codeTemplates/server/package.json"),
      backendPackage_json,
      (error) => {
        if (error) throw error;
      }
    );
    // write server.js file
    fs.writeFile(
      path.join(__dirname, "/codeTemplates/server/template1.js"),
      backendTemplate,
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFile(
      path.join(__dirname, "/codeTemplates/client/src/package.json"),
      frontendPackage_json,
      (err) => {
        if (err) throw err;
      }
    );
    // write reactTemplate file
    fs.writeFile(
      path.join(__dirname, "/codeTemplates/client/src/index.js"),
      frontEndTemplate,
      (err) => {
        if (err) throw err;
      }
    );

    const templates = {
      frontend: frontEndTemplate,
      backend: backendTemplate,
      frontEndPackageJSON: frontendPackage_json,
      backendPackageJSON: backendPackage_json,
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
};

exports.renderController = async (req, res, next) => {
  try {
    res.json({ code: req.session.template, user: req.session.user });
  } catch (err) {
    console.log(err);
  }
};
