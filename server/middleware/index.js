const next = require("./next");

module.exports = function(app) {
  app.get("*", next());
};