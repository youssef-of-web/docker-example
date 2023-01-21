var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const ObjectsToCsv = require("objects-to-csv");

var indexRouter = require("./routes/index");

var app = express();
let premierLeagueTable = [];
(async function () {
  const response = await axios("https://www.bbc.com/sport/football/tables");
  const html = await response.data;
  const $ = cheerio.load(html);
  const allRows = $("table.gs-o-table > tbody.gel-long-primer > tr");

  allRows.each((index, element) => {
    const tds = $(element).find("td");
    const team = $(tds[2]).text();
    const played = $(tds[3]).text();
    const won = $(tds[4]).text();
    const drawn = $(tds[5]).text();
    const lost = $(tds[6]).text();
    const gf = $(tds[7]).text();
    const against = $(tds[8]).text();
    const gd = $(tds[9]).text();
    const points = $(tds[10]).text();
    premierLeagueTable.push({
      Team: team,
      Played: played,
      Won: won,
      Drawn: drawn,
      Lost: lost,
      "Goals For": gf,
      "Goals Against": against,
      "Goals Difference": gd,
      Points: points,
    });
  });
  console.log("Saving data to CSV");
  const csv = new ObjectsToCsv(premierLeagueTable);
  await csv.toDisk("./footballData.csv");
  console.log("Saved to csv");
})();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
