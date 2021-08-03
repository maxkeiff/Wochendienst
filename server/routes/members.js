const express = require("express");
const router = express.Router();
const database = require("../services/database.js");
const helper = require("../services/helper.js");

router.get("/", function (req, res) {
  var query = "select * from members";

  database.run_query(query, function (err, records) {
    if (err) console.log(err);

    res.send(records);
  });
});

router.get("/athome", function (req, res) {
  var query = `select * from members where is_excluded = 0 and (select count(*) from absences where member_id = members.id and CURRENT_DATE between from_date and until_date) = 0`;

  database.run_query(query, function (err, records) {
    if (err) console.log(err);

    records.sort(helper.sortByProperty("room"));
    res.send(records);
  });
});

router.get("/:id", function (req, res) {
  var query = `select * from members where id = ${req.params.id}`;

  database.run_query(query, function (err, records) {
    if (err) console.log(err);

    records.sort(helper.sortByProperty("room"));
    res.send(records);
  });
});

module.exports = router;
