//class to easier catch and error, and handle it in backend and frontend too

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = ExpressError;
