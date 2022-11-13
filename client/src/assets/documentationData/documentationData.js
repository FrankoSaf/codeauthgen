import step1Image from "./stepsImages/step-1.png";
import step2Image from "./stepsImages/step-2.png";
import step3Image from "./stepsImages/step-3.png";
import step4Image from "./stepsImages/step-4.png";
import step5Image from "./stepsImages/step-5.png";

export const GettingStartedData = [
  {
    step: "Step One - create inputs:",
    content:
      "for registration or logging into a website we use inputs for getting the user data.",
    steps: [
      { text: "choose a name for your input" },
      { text: "select the input type you desire." },
      {
        text: "not mandatory, if you want the input to be unique or required turn the want validation switch to on and choose which one of them you want or all of them.",
      },
      { text: "Click on Generate button, to generate your input." },
    ],
    image: step1Image,
  },
  {
    step: "Step Two - choose which inputs to add for the login component:",
    content:
      "choose which inputs to add for the login component ( how will the user log in? Email & password ? Or email & username ? ) and select one of them to be the main input for the login component. automatically the first inputs you create will go to the registration component. in case you don't add any of them to login input our tool automatically will choose for you the first one you've created.",
    image: step2Image,
  },
  {
    step: "Step Three - choose the auth method:",
    content:
      "when creating a user authentication there are many approaches. After some research, we've made we chose for you the 3 most used methods by developers for you to choose from. Just check one of them, and it will be implemented in your template.",
    steps: [
      {
        text: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/expressjs/session#readme"
          >
            SESSION
          </a>
        ),
        link: "https://github.com/expressjs/session#readme",
      },
      {
        text: " —> Token inside the cookie to authenticate the user.",
        link: {
          jwt: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://jwt.io/introduction"
            >
              JWT
            </a>
          ),
          cookie: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jshttp/cookie"
            >
              COOKIE
            </a>
          ),
        },
      },
      {
        text: " —> Token inside the header of the request.",
        link: {
          jwt: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://jwt.io/introduction"
            >
              JWT
            </a>
          ),
          axios: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://axios-http.com/docs/intro"
            >
              AXIOS
            </a>
          ),
        },
      },
    ],
    image: step3Image,
  },
  {
    step: "Step Four - Choose packages:",
    content:
      "Here you can choose if you want dotenv and nodemailer to be installed and implemented in your app.",
    links: {
      dotenv: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.npmjs.com/package/dotenv"
        >
          DOTENV
        </a>
      ),
      nodemailer: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://nodemailer.com/about/"
        >
          NODEMAILER
        </a>
      ),
    },
    image: step4Image,
  },
  {
    step: "Step five - Initializing your backend app: ",
    content:
      "Usually when creating a nodeJS app we can initialize our app details, for example, author name, project description, and so on.. here you can fill up the form and get those details injected into your app.",
    image: step5Image,
  },
  {
    step: "Step six - create the template:",
    content:
      "Click the CREATE TEMPLATE button and your finished template will appear on the right side of your screen.",
  },
  {
    step: "Step seven - NOT MANDATORY:",
    content:
      "If you want to save the template and get it whenever you need it you can register to our database and save your templates and review them whenever you need.",
  },
  {
    step: "Step eight - implementing your template in your code editor:",
    content:
      "Install dependencies in client and server repositories ( npm install in terminal in both repositories ) then npm start. For registered users, you can download a zip folder of your template.",
    steps: [
      { text: "Extract the project" },
      {
        text: "Open terminal in project root folder(where you can see server folder and client folder)",
      },
      { text: "Type npm install , enter, wait until installation finished" },
      {
        text: "Type npm run install_both , enter, wait till installation finished. Here you need to wait for the information from front-end, this takes a little bit longer",
      },
      { text: "Type npm start , enter, now you can start your project" },
    ],
  },
  {
    step: "Step nine - start your project based on the template you've created",
    content: "",
  },
];

export const errorCodes = [
  "{errCode: 0, data: error, path: 'encrypt.genSalt'}",
  "{errCode: 1, data: error, path: 'encrypt.hash'}",
  "{errCode: 2,data: error,path: 'compareEncryptData.compare',}",
  "{errCode: 3, data: error, path: 'jwtSign.sign.payload.obj'}",
  "{errCode: 4, data: error, path: 'jwtSign.sign.payload.str'}",
  "{errCode: 5, data: error, path: 'jwtVerify.verify'}",
  "{errCode: 20, data: error, path: 'mongodbSave.create'}",
  "{errCode: 21, data: error, path: 'mongodbUpdate.updateOne'}",
  "{errCode: 22, data: error, path: 'mongodbFindOne.findOne'}",
  "{errCode: 26, data: error, path: 'req.session.save'}",
  "{errCode: 11, data: { msg: 'email already used' }, path: 'create user'} // find the email address in DB",
  "{ errCode: 12, data: error, path: 'nodemailer.sendEmail' }",
  "{ errCode: 14, data: err, path: 'send verification email' }",
  "{errCode: 15, data: { msg: 'email not find' }, path: 'user login'}",
  "{errCode: 16, data: { msg: 'wrong password' }, path: 'user login'}",
  "{errCode: 17, data: { msg: 'wow something wrong' , ...err}, path: 'user logout'}",
  "{errCode: 18, data: { msg: 'wow something wrong' , ...err}, path: '/user/profile'}",
  "{ errCode: 33, data: { msg: 'you need login first' }, path: 'middleware.auth' }",
];

export const templateLogics = [
  "When you want to use nodemailer, you must have an input with type == 'email'.",
  "Password will always get encrypted.",
  "Registration Inputs will be added to Schema, except type == 'button'",
  "If you put nothing in login inputs, the main input of registration inputs will be the login inputs (your first registration input will be the main input by default)",
];
