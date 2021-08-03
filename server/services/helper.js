function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    else return 0;
  };
}

// https://weeknumber.com/how-to/javascript
function getWeekNumber(date) {
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

function diffInDays(date1, date2) {
  var diffInMs = Math.abs(new Date(date1) - new Date(date2));
  return diffInMs / (1000 * 60 * 60 * 24);
}

function dateISO(date) {
  return date.toISOString().substring(0, 10);
}

module.exports = { sortByProperty, getWeekNumber, diffInDays, dateISO };
