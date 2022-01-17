const handle = require("../nextApp").handle;

module.exports = function(options = {}) {
  return function next(req, res, next) {
    return handle(req, res);
  };
};