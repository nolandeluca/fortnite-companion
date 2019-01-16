function timeConvert(time) {
  let result = "",
    d = parseInt(time / 24 / 60),
    h = parseInt((time / 60) % 24),
    m = parseInt(time % 60);
  if (d > 0) result += d + "d "; //nb days
  if (h > 0) result += h + "h "; //nb hours
  if (m > 0) result += m + "m";
  //nb minutes
  else result = result + "0m ";

  return result.trim();
}

function ratio(a, b) {
  if (parseInt(b) === 0) return 0;
  else return (parseInt(a) / parseInt(b)).toFixed(2);
}
function rate(a, b) {
  if (parseInt(b) === 0) return 0;
  else return ((parseInt(a) / parseInt(b)) * 100).toFixed(2);
}

module.exports = {
  checkPlatform: (stats, platform) => {
    let result = false;

    stats.every(function(elem) {
      if (elem.name.indexOf("_" + platform + "_") != -1) {
        result = true;
        return false;
      } else {
        return true;
      }
    });

    return result;
  },
  convert: (stats, user, platform) => {
    let result = {
      group: {
        solo: {
          wins: 0,
          top3: 0,
          top5: 0,
          top6: 0,
          top10: 0,
          top12: 0,
          top25: 0,
          "k/d": 0,
          "win%": 0,
          matches: 0,
          kills: 0,
          timePlayed: 0,
          killsPerMatch: 0,
          killsPerMin: 0,
          score: 0
        },
        duo: {
          wins: 0,
          top3: 0,
          top5: 0,
          top6: 0,
          top10: 0,
          top12: 0,
          top25: 0,
          "k/d": 0,
          "win%": 0,
          matches: 0,
          kills: 0,
          timePlayed: 0,
          killsPerMatch: 0,
          killsPerMin: 0,
          score: 0
        },
        squad: {
          wins: 0,
          top3: 0,
          top5: 0,
          top6: 0,
          top10: 0,
          top12: 0,
          top25: 0,
          "k/d": 0,
          "win%": 0,
          matches: 0,
          kills: 0,
          timePlayed: 0,
          killsPerMatch: 0,
          killsPerMin: 0,
          score: 0
        }
      },
      info: {
        accountId: user.id,
        username: user.displayName,
        platform: platform
      },
      lifetimeStats: {
        wins: 0,
        top3s: 0,
        top5s: 0,
        top6s: 0,
        top10s: 0,
        top12s: 0,
        top25s: 0,
        "k/d": 0,
        "win%": 0,
        matches: 0,
        kills: 0,
        killsPerMin: 0,
        timePlayed: 0,
        score: 0
      }
    };

    let totalTime = 0;

    //Get Data
    stats.forEach(elem => {
      let key = elem.name;
      let type = "";
      let mode = "";

      //Wins
      if (key.indexOf("placetop1_" + platform) !== -1) type = "wins";
      else if (key.indexOf("placetop3_" + platform) !== -1)
        //top 1
        type = "top3";
      else if (key.indexOf("placetop5_" + platform) !== -1)
        //top 3
        type = "top5";
      else if (key.indexOf("placetop6_" + platform) !== -1)
        //top 5
        type = "top6";
      else if (key.indexOf("placetop10_" + platform) !== -1)
        //top 6
        type = "top10";
      else if (key.indexOf("placetop12_" + platform) !== -1)
        //top 10
        type = "top12";
      else if (key.indexOf("placetop25_" + platform) !== -1)
        //top 12
        type = "top25";
      else if (key.indexOf("matchesplayed_" + platform) !== -1)
        //top 25
        type = "matches";
      else if (key.indexOf("kills_" + platform) !== -1)
        //matches
        type = "kills";
      else if (key.indexOf("score_" + platform) !== -1)
        //kills
        type = "score";
      else if (key.indexOf("minutesplayed_" + platform) !== -1) {
        //score
        //minutes played
        totalTime = totalTime + elem.value;
        type = "timePlayed";
      } else if (key.indexOf("lastmodified_" + platform) !== -1) {
        type = "lastModified";
      }

      if (key.indexOf("_p2") !== -1) mode = "solo";
      else if (key.indexOf("_p10") !== -1) mode = "duo";
      else mode = "squad";

      if (type) result.group[mode][type] = elem.value;
    });

    //Calculate KDRate
    result.group.solo["k/d"] = ratio(
      result.group.solo["kills"],
      result.group.solo["matches"] - result.group.solo["wins"]
    );
    result.group.duo["k/d"] = ratio(
      result.group.duo["kills"],
      result.group.duo["matches"] - result.group.duo["wins"]
    );
    result.group.squad["k/d"] = ratio(
      result.group.squad["kills"],
      result.group.squad["matches"] - result.group.squad["wins"]
    );

    //Calculate WinRate
    result.group.solo["win%"] = rate(
      result.group.solo["wins"],
      result.group.solo["matches"]
    );
    result.group.duo["win%"] = rate(
      result.group.duo["wins"],
      result.group.duo["matches"]
    );
    result.group.squad["win%"] = rate(
      result.group.squad["wins"],
      result.group.squad["matches"]
    );

    // <------------------------------------------------------------------->

    //Calculate KDRate
    result.lifetimeStats["k/d"] = ratio(
      result.lifetimeStats["kills"],
      result.lifetimeStats["matches"] - result.lifetimeStats["wins"]
    );

    //Calculate WinRate
    result.lifetimeStats["win%"] = rate(
      result.lifetimeStats["wins"],
      result.lifetimeStats["matches"]
    );

    //Calculate timePlayed
    result.lifetimeStats["timePlayed"] = timeConvert(
      result.lifetimeStats["timePlayed"]
    );

    return result;
  }
};
