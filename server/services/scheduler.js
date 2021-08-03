const helper = require("./helper.js");

function assignNextMember(currentDate, assigned, res) {
  // quit as soon as we reach the current week
  var today = new Date();
  var diffInDays = helper.diffInDays(today, currentDate);
  if (diffInDays < 7) {
    res.send(assigned.first_name + " " + assigned.last_name);
    return;
  }

  // otherwise assign member for next week
  currentDate.setDate(currentDate.getDate() + 7);
  var query = `select * from members where is_excluded = 0 and (select count(*) from absences where member_id = members.id and ${helper.dateISO(
    currentDate
  )} between from_date and until_date) = 0`;
  database.run_query(query, function (err, records) {
    if (err) console.log(err);

    // select next room from these records
    records.sort(helper.sortByProperty("room"));
    var j = 0;
    if (records[records.length - 1].room > assigned.room) {
      while (records[j].room <= assigned.room) {
        j++;
      }
    }
    assigned = records[j];

    // update assigned member
    var query = `update members set last_time = "${helper.dateISO(
      currentDate
    )}", assigned_count = ${assigned.assigned_count + 1} where id = ${
      records[j].id
    }`;

    database.run_query(query, function (err, records) {
      if (err) console.log(err);

      assignNextMember(currentDate, assigned, res);
    });
  });
}

module.exports = { assignNextMember };
