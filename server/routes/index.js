const express = require("express");
const router = express.Router();
const database = require("../services/database.js");
const scheduler = require("../services/scheduler.js");

router.get("/", function (req, res) {
  res.send("Hello World!");
});

router.get("/current", function (req, res) {
  var query = `select * from members where last_time in (select max(last_time) from members)`;
  database.run_query(query, function (err, records) {
    if (err) console.log(err);

    var assigned = records[0];
    scheduler.assignNextMember(assigned.last_time, assigned, res);
  });
});

module.exports = router;
