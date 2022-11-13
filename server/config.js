const config = {

  model: "deploy", // "deploy"

  dev: {
    domain: "http://localhost:5000",
    frontEnd: "http://localhost:3000",
  },
  deploy: {
    domain: "https://lazydevs.onrender.com",
    frontEnd: "https://lazydevs.onrender.com",
  },
};

module.exports = config;
