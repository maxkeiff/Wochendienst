module.exports = function (app) {
  var index = require("./routes/index.js");
  var members = require("./routes/members.js");

  app.use("/", index);
  app.use("/members", members);
};
