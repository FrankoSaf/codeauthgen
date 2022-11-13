/**
 * generator app.jsx's code all in one file
 * @req request from frontend method:post
 * @file need create a file ? default is false
 * @filePath relative path to save/update the server.js .Defalt is './test/client/src/app.jsx'
 * @return string format of code of app.jsx
 */
const appJsTemplate_gen = (
  req,
  file = false,
  filePath = "./test/client/src/App.jsx"
) => {
  const tm1 = req.body.template == "tm1_session" ? true : false;
  const tm2 = req.body.template == "tm2_jwt_cookie" ? true : false;
  const tm3 = req.body.template == "tm3_jwt_axios" ? true : false;
  // let axios = req.body.frontend_packages.axios;
  // if (tm3) axios=true;

  // sort the array put main input at first. password will be second if there is one
  // update name let it macht Schema format name_type
  const registrationInputs = req.body.registrationInputs;
  const loginInputs = req.body.loginInputs;

  let appJsTemplate = `   // This is React Front end code 
   // how to use: 
   // copy and paste it in your react_folder/src/App.js

import { useState, useEffect } from "react";
${tm3 ? `import axios from "axios";` : ""}

// settings
${
  tm2 || tm3
    ? `const baseURL = 'http://localhost:5000';`
    : `const baseURL = '';`
}

${
  tm3
    ? `// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
// create new variable and let it work as axios
// axios with token inside request headers  => A.W.T.IRH
const AWT = axios.create({ baseURL })
// get token 
AWT.interceptors.request.use(req => {
  if (localStorage.getItem("token")) {
    // get token 
    const token = localStorage.getItem("token")
    // set the req.headers
    req.headers.token = token
  };
  return req;
}); // this.template end`
    : ""
}

function App() {
  // to show/hide login form and signup from
  const [toggle, setToggle] = useState({
    showSignIn: false,
    showLogIn: false,
    logOut: true
  });

  const [userAuth, setUserAuth] = useState({
    login: false,
    signup: false,
  })

  const [display, setDisplay] = useState({
    msg: "",
    data: {},
    err: {}
  });
  // console.log(display)

  // userAuth is set to false bu default. That means if you refresh the page, userAuth = false even you already login and the auth is still valid
  // this useEffect is used to check auth status of the user
  useEffect(() => {

    ${
      tm1
        ? `// Template - 1 session + proxy
    fetch(baseURL + '/user/loginStatus')
    .then(response => response.json())
    .then(data => {
      if (data.login) {
        console.log(data)
        setUserAuth(data)
      }
    })
    .catch(err => {console.log(err)}) // Template end`
        : ""
    }
    

    ${
      tm2
        ? `// Template - 2  jsonwebtoken + cookie-parser
    fetch(baseURL + '/user/loginStatus', {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (data.login) {
        setUserAuth(data)
      }
    })
    .catch(err => {console.log(err)}) // Template end`
        : ""
    }

    ${
      tm3
        ? `// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
    // firstly check the localStorage
    if(localStorage.getItem('token')) {
      AWT.get('/user/loginStatus')
      .then(({ data }) => {
        if (data.login) {
          setUserAuth(data)
        }
      })
      .catch(err => {console.log(err)})
    } // Template end`
        : ""
    }
  }, [])

  return (
    <div className="App" style={style.app}>
      <Header toggle={toggle} setToggle={setToggle} userAuth={userAuth} setUserAuth={setUserAuth} setDisplay={setDisplay}/>
      <Home display={display}  setDisplay={setDisplay}/>

      {/* modals */}
      {toggle.showSignIn && <SingUp setUserAuth={setUserAuth} setToggle={setToggle} setDisplay={setDisplay}/>}
      {toggle.showLogIn && <LogIn setUserAuth={setUserAuth} setToggle={setToggle} setDisplay={setDisplay}/>}

    </div>
  );
}

export default App;

// components

// Header
function Header({ toggle, setToggle, userAuth, setUserAuth, setDisplay }) {
  return (
    <div className="header m-4" style={style.header}>
      <h1>Welcome to ${req.body.project_name} Project</h1>
      <Navbar toggle={toggle} setToggle={setToggle} userAuth={userAuth} setUserAuth={setUserAuth} setDisplay={setDisplay}/>
    </div>
  );
}

// Navbar
function Navbar({ toggle, setToggle, userAuth, setUserAuth, setDisplay }) {
  // switch turn and false for login form, signup form
  const toggleSwitch = e => setToggle(prev => ({ showSignIn: false,
    showLogIn: false, [e.target.className]: !prev[e.target.className] }));
  
  const profileHandler = e => {
    // touch the auth check api and display the result

    ${
      tm1
        ? `// Template - 1 session + proxy
    fetch(baseURL + "/user/profile" )
    .then(response => response.json())
    .then(data => setDisplay(pre=> ({ data: data})))
    .catch(err => setDisplay(pre=> ({ err: err}) )) // Template end`
        : ""
    }


    ${
      tm2
        ? `// Template - 2  jsonwebtoken + cookie-parser
    fetch(baseURL + "/user/profile", {credentials: 'include'})
    .then(response => response.json())
    .then(data => setDisplay(pre=> ({ data: data})))
    .catch(err => setDisplay(pre=> ({ err: err}) )) // Template end`
        : ""
    }

    ${
      tm3
        ? `// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
    AWT.get('/user/profile')
      .then(({ data }) => setDisplay(pre=> ({ data: data})))
      .catch(err => setDisplay(pre=> ({ err: err}) )) // Template end`
        : ""
    }
  };
  
  const logOutHandler = e => {
    ${
      tm1
        ? `fetch(baseURL + '/user/logout')
    .then(response => response.json())
    .then(data =>{
      if (data.logout) {
        setUserAuth(pre=>({...pre, login: false}))
      // navigate to another page to trigger rerender
      setDisplay({
        msg: "You logged out",
        data: {},
        err: {}
      })}
    })
    .catch(err => setDisplay(pre=> ({errCode: 17, data: { msg: "wow something wrong" , ...err}, path: 'user logout'}) ))`
        : ""
    }


    ${
      tm2
        ? `// call backend to destroy cookie
    fetch(baseURL + '/user/logout', {credentials: 'include'})
    .then(response => response.json())
    .then(data =>{
      if (data.logout) {
        setUserAuth(pre=>({...pre, login: false}))
      // navigate to another page to trigger rerender
      setDisplay({
        msg: "You logged out",
        data: {},
        err: {}
      })}
    })
    .catch(err => setDisplay(pre=> ({errCode: 17, data: { msg: "wow something wrong" , ...err}, path: 'user logout'}) ))`
        : ""
    }

    ${
      tm3
        ? `// Template - 3  jsonwebtoken + axios(.create)
    localStorage.clear()
    setUserAuth(pre=>({...pre, login: false}))
    // navigate to another page to trigger rerender
    setDisplay({
      msg: "You logged out",
      data: {},
      err: {}
    })`
        : ""
    }
  }

  return (
    <div className="navbar">
      <ul style={style.navbar_ul}>
        {!userAuth.login && <>
          <li className="btn btn-light px-5"><span onClick={toggleSwitch} className="showSignIn">Sign up</span></li>
          <li className="btn btn-light px-5"><span onClick={toggleSwitch} className="showLogIn">Log In</span></li>
        </>}
        {userAuth.login && <li className="btn btn-light px-5"><span onClick={logOutHandler} className="logOut">Log Out</span></li>}
        <li className="btn btn-light px-5"><span onClick={profileHandler}>profile</span></li>
      </ul>
    </div>
  );
}

// Home
function Home({display, setDisplay}) {
  // touch the backend and display res.json (string)
  useEffect(()=>{
    fetch(baseURL)
    .then(response => response.json())
    .then(data=> {
      setDisplay(pre=>({...pre, msg:data}))
    })
    .catch(err=> setDisplay(pre=>({...pre, data:err})))
  }, [])
  return (
    <div className="home">
      {
        display && <div className="container">
        {display.msg && <h4 className="text-center m-4">{display.msg}</h4> }
        {display.data && <div><strong className="text-info">data: </strong> {
        Object.entries(display.data).map((x, i)=>{
          if(typeof x =="object") {
            return <p key={i}>{x[0]} : {JSON.stringify(x[1])}</p>
          } else return <p key={i}>{x[0]} : {x[1]}</p>
        })
        }</div> }
        {display.err && <div><strong className="text-danger">error: </strong> {
        Object.entries(display.err).map((x, i)=>{
          if(typeof x =="object") {
            return <p key={i}>{x[0]} : {JSON.stringify(x[1])}</p>
          } else return <p key={i}>{x[0]} : {x[1]}</p>
        })
        }</div> }
        </div>
      }
    </div>
  );
}

// SingUp
// import { useState } from "react";
function SingUp({setUserAuth, setToggle, setDisplay}) {
  const signUpHandler = e => {
    e.preventDefault()
    // data to send to backend
    const dataToSend = {
      ${registrationInputs
        .map((x) => {
          if (x.type === "checkbox") {
            return `${x.name}: e.target.${x.name}.checked`;
          } else if (x.type != "button") {
            return `${x.name}: e.target.${x.name}.value`;
          }
        })
        .join(",\n      ")
        .split(",")
        .filter((x) => x)
        .join(",")}
    };

    // fetch with post method
    ${
      tm1
        ? `// Template - 1 session + proxy
    fetch(baseURL+'/user/create', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserAuth({login: data.login, signup: data.signup}) 
        setToggle({
          showSignIn: false,
          showLogIn: false,
          logOut: true
        })
        setDisplay(prev => {
                return data.errCode ? { ...prev, err: data, msg: data.data.msg } : { ...prev, data: data, msg: "Welcome Join Us" };
               })
        setDisplay(prev=>({...prev, msg: "Welcome Join Us", data: data}))
      })
      .catch(error => setDisplay(prev=>({...prev, msg: "WoW! Something wrong!", err: error}))); // template end here`
        : ""
    }


      ${
        tm2
          ? `// Template - 2  jsonwebtoken + cookie-parser
      fetch(baseURL+'/user/create', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setUserAuth({login: data.login, signup: data.signup}) 
          setToggle({
            showSignIn: false,
            showLogIn: false,
            logOut: true
          })
          setDisplay(prev => {
                  return data.errCode ? { ...prev, err: data, msg: data.data.msg } : { ...prev, data: data, msg: "Welcome Join Us" };
                 })
          setDisplay(prev=>({...prev, msg: "Welcome Join Us", data: data}))
        })
        .catch(error => setDisplay(prev=>({...prev, msg: "WoW! Something wrong!", err: error}))); // template end here`
          : ""
      }

      ${
        tm3
          ? `// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
      AWT.post(baseURL + '/user/create', dataToSend)
        .then(({ data }) => {
          // save token in localStorage
          if (data.token) {
            localStorage.setItem('token', data.token)
            setUserAuth({login: data.login, signup: data.signup}) 
            setToggle({
              showSignIn: false,
              showLogIn: false,
              logOut: true
            })
          };
          setDisplay(prev => {
            return data.errCode ? { ...prev, err: data, msg: data.data.msg } : { ...prev, data: data, msg: "Welcome Join Us" };
          })
        })
        .catch(error => setDisplay(prev => ({ ...prev, msg: "WoW! Something wrong!", err: error }))); // template end here`
          : ""
      }
  }
  return (
    <div className="signup container">
      <h3 className="text-center">Sign up</h3>
      <form onSubmit={signUpHandler}>
      ${registrationInputs
        .map((x, i) => {
          if (x.type == "button") {
            return `<div className="form-floating mb-3"><input type="${x.type}" name="${x.name}" value="${x.name}" className="btn btn-light"/></div>`;
          } else if (x.type == "checkbox") {
            return `
          <div className="form-check mb-3">
            <input type="${x.type}" name="${x.name}" id="${x.name}" className="form-check-input my-1"/>
            <label htmlFor="${x.name}" className="form-check-label">${x.name}</label>
            </div>
        `;
          } else {
            return `
          <div className="form-floating mb-3">
            <input type="${x.type}" name="${x.name}" id="${x.name}" className="form-control my-1" placeholder=" "/>
            <label htmlFor="${x.name}">${x.name}</label>
            </div>
        `;
          }
        })
        .join("")}
        <div>
          <button type="submit" className="btn btn-primary m-3 px-5 py-2">Sign up</button>
        </div>
      </form>

    </div>
  );
}

// LogIn
// import { useState } from "react";
function LogIn({setUserAuth, setToggle, setDisplay}) {
 
  const loginHandler = e => {
    e.preventDefault()
    // data to send to backend
    const dataToSend = {
      ${loginInputs
        .map((x) => {
          if (x.type === "checkbox") {
            return `${x.name}: e.target.${x.name}.checked`;
          } else if (x.type != "button") {
            return `${x.name}: e.target.${x.name}.value`;
          }
        })
        .join(",\n      ")
        .split(",")
        .filter((x) => x)
        .join(",")}
    };

    // fetch with post method
    ${
      tm1
        ? `// Template - 1 session + proxy
    fetch(baseURL + '/user/login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setDisplay(prev => {
          return result.errCode ? { ...prev, err: result, msg: result.data.msg } : { ...prev, data: result, msg: "Welcome Join Us" };
        });
        setUserAuth({login: result.login });
        setToggle({
          showSignIn: false,
          showLogIn: false,
          logOut: true
        });
      })
      .catch(error => setDisplay(prev => ({ ...prev, msg: "WoW! Something wrong!", err: error }))); // template end here`
        : ""
    }

      ${
        tm2
          ? `// Template - 2  jsonwebtoken + cookie-parser
      fetch(baseURL + '/user/login', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((result) => {
          setDisplay(prev => {
            return result.errCode ? { ...prev, err: result, msg: result.data.msg } : { ...prev, data: result, msg: "Welcome Join Us" };
          });
          setUserAuth({login: result.login });
          setToggle({
            showSignIn: false,
            showLogIn: false,
            logOut: true
          });
        })
        .catch(error => setDisplay(prev => ({ ...prev, msg: "WoW! Something wrong!", err: error }))); // template end here`
          : ""
      }

        ${
          tm3
            ? `// Template - 3  jsonwebtoken + axios(.create) save token in localStorage
        AWT.post(baseURL + '/user/login', dataToSend)
          .then(({ data }) => {
            if (data.login) {
              // save token in localStorage
              localStorage.setItem('token', data.token);
              setUserAuth({login: data.login })
              setToggle({
                showSignIn: false,
                showLogIn: false,
                logOut: true
              })
            }
            setDisplay(prev => {
              return data.errCode ? { ...prev, err: data, msg: data.data.msg } : { ...prev, data: data, msg: "Welcome Join Us" };
            })
          })
          .catch(error => setDisplay(prev => ({ ...prev, msg: "WoW! Something wrong!", err: error }))); // template end here`
            : ""
        }

  }
  return (
    <div className="login container">
      <h3 className="text-center">Log in</h3>
      <form onSubmit={loginHandler}>
      ${loginInputs
        .map((x, i) => {
          if (x.type == "button") {
            return `<div className="form-floating mb-3"><input type="${x.type}" name="${x.name}" value="${x.name}" className="btn btn-light"/></div>`;
          } else if (x.type == "checkbox") {
            return `
          <div className="form-check mb-3">
            <input type="${x.type}" name="${x.name}" id="${x.name}" className="form-check-input my-1"/>
            <label htmlFor="${x.name}" className="form-check-label">${x.name}</label>
            </div>
        `;
          } else {
            return `
          <div className="form-floating mb-3">   
            <input type="${x.type}" name="${x.name}" id="${x.name}" className="form-control my-1" placeholder=" "/>
            <label htmlFor="${x.name}">${x.name}</label>
            </div>
        `;
          }
        })
        .join("")}
        <div>
          <button type="submit" className="btn btn-primary m-3 px-5 py-2">Log In</button>
        </div>
      </form>

    </div>
  );
}

// styles
const style = {
  app: {
    width: '100vw',
    height: '100vh',
    backgroundColor: "white",
  },
  header: {
    textAlign: 'center'
  },
  navbar_ul: {
    width: '100vw',
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

`;

  const trimEmptyLine = require("./tools/trimEmptyLine");
  appJsTemplate = trimEmptyLine(appJsTemplate);

  if (file) {
    const path = require("path");
    const fs = require("fs");
    fs.writeFile(path.join(__dirname, filePath), appJsTemplate, (err) => {
      if (err) throw err;
    });
  }

  return appJsTemplate;
};

module.exports = appJsTemplate_gen;
