// importing dependencies
  const express = require('express');
  
  
  
  const mongoose = require('mongoose');
  const app = express();
  // config dotenv
  
  // importing Port
  const port = 5000;
  const dbLink='mongodb://localhost:27017'
  
  // connect to database
  mongoose.connect(dbLink, err => {
      if (err) throw (err)
      console.log("MongoDB is connected")
  });
  
  // middleweares
  received.cors&&app.use(cors())
  app.use(express.json())
  
  
  // Routers
  // index router
  const indexRouter = express.Router()
  
  indexRouter.get('/', home_controller)
  
  // user router
  const userRouter = express.Router()
  
  userRouter.get('/login', login_form_controller)
  userRouter.post('/login', login_submit_controller)
  
  userRouter.get('/create', register_form_controller)
  userRouter.post('/create', register_submit_controller)
  
  userRouter.get('/logout', authCheck, logout_controller)
  
  // Router settings
  app.use('/', indexRouter)
  
  app.use('/user', userRouter)
  
  
  // server listen and connect to database
  app.listen(port, () => {
      console.log("Server is running on port: " + port)
  });
  
  // mongoose Schema and model
  const { Schema, model } = require('mongoose');
  
  const userSchema = new Schema({
      email: {
          type: String,
          unique: true,
          required: true
      },
      password: {
          type: String,
          required: true
      }
  });
  
  const User_model = model('user', userSchema);
  
  // controllers
  
  function home_controller(req, res) {
      res.json("This is home page")
  } // Home Page
  
  function login_form_controller(req, res) { } // Login Page
  
  function login_submit_controller(req, res) {
      // compare user input(req.body) and data in database
      const { email, password } = req.body;
      User_model.findOne({ email }, (err, user) => {
          if (err) throw err;
          if (!user) res.json({ errCode: 15, data: { msg: "email not find" }, path: 'user login' })
          else { // compare the password
              if(password===user.password){
                
                res.json({ login: true });
              }
          }
      })
  }
  
  function register_form_controller(req, res) { }
  
  function register_submit_controller(req, res) {
      const { email, password } = req.body;
      // check the email is already used or not
      User_model.findOne({ email })
          .then(result => {
              // email is already used
              if (result) res.json({ errCode: 11, data: { msg: "email already used" }, path: 'create user' })
              User_model.create(req.body).then(data=>{
                res.json({ signin: true, login: true })
              }).catch(err => res.json({ errCode: 10, data: err, path: 'create user' }))
          })
          .catch(err => res.json({ errCode: 9, data: err, path: 'create user' }))
  
  }
  
  
  
  
  // middle ware 
  
  // auth check
 ;