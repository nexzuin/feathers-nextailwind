const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dir: "./client", dev });
const handle = nextApp.getRequestHandler();

module.exports = {
  nextApp,
  handle
};