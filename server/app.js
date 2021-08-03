const express = require("express");
const config = require("./config.js");

const app = express();
require("./routes")(app);

var port = config.serverConfig.port;
var server = app.listen(port, function () {
  console.log(`Server is listening at port ${port}...`);
});
