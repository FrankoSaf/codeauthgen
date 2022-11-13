export const backEndFormData = ["dotenv", "nodemailer"];

export const backendTemplates = [
  { template: "tm1_session", name: "SESSION" },
  { template: "tm2_jwt_cookie", name: "JWT & COOKIE" },
  { template: "tm3_jwt_axios", name: "JWT & AXIOS" },
];

export const initializingServerData = [
  {
    name: "PROJECT NAME",
    nameForTemplate: "project_name",
    placeholder: "lazy_devs",
  },
  {
    name: "PROJECT DESCRIPTION",
    nameForTemplate: "project_description",
    placeholder: "user authentication boilerplate",
  },
  {
    name: "PROJECT AUTHOR",
    nameForTemplate: "project_author",
    placeholder: "sufaz",
  },
  {
    name: "PROJECT LICENSE",
    nameForTemplate: "project_license",
    placeholder: "dci - digital career institute",
  },
  {
    name: "SECRET KEY",
    nameForTemplate: "secretKey",
    placeholder: "secret_key",
  },
  {
    name: "EXPIRE TIME",
    nameForTemplate: "expireTime",
    placeholder: "2592000000",
  },
  { name: "PORT", nameForTemplate: "port", placeholder: "5000" },
  {
    name: "FRONTEND ORIGIN",
    nameForTemplate: "frontendOrigin",
    placeholder: "http://localhost:3000",
  },
  {
    name: "BACKEND ORIGIN",
    nameForTemplate: "backendOrigin",
    placeholder: "http://localhost:",
  },
  {
    name: "MONGODB URI",
    nameForTemplate: "mongodbURI",
    placeholder: "mongodb://localhost:27017",
  },
];

export const nodemailerSetting = [
  { name: "HOST", nameForTemplate: "host" },
  { name: "PORT", nameForTemplate: "port" },
  { name: "USER", nameForTemplate: "user" },
  { name: "PASS", nameForTemplate: "pass" },
  { name: "SENDER EMAIL", nameForTemplate: "senderEmail" },
];
