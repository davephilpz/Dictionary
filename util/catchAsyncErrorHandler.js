//all depedant functions require next to pass errors into following middleware
module.exports = (asyncFunction) => {
  //have this function return an anonymous function to original function to later be used by express.
  return (req, res, next) => {
    //catch catches return of promise rejection available on all async functions
    asyncFunction(req, res, next).catch((err) => next(err));
  };
};
