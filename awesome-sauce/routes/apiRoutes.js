var db = require("../models");

//GET
module.exports = function(app){
  app.get("/api/stats/", function(req, res) {
    db.Stat.findAll({}).then(function(dbStat) {
      console.log(dbStat);
      res.json(dbStat);
    });
  });
//GET BY PLATFORM
  app.get("/api/stats/:platform", function(req, res) {
    db.Stat.findAll({
      where: {
        platform: req.params.platform
      }
    }).then(function(dbStat) {
      res.json(dbStat);
    });
  });


//POST the values to DB
    app.post("/api/stats", function(req, res) {
    
        db.Stat.create({
          userid: req.body.userid,
          kills: req.body.kills,
          wins:req.body.wins,
          matchesplayed:req.body.matchesplayed,
          kd:req.body.kd,
          platform:req.body.platform
        }).then(function(dbStat) {
          res.json(dbStat);
        });
      });

        // PUT route for updating posts
  app.put("/api/stats", function(req, res) {
    db.Stat.update({
    kills: req.body.kills,
    wins: req.body.wins,
    matchesplayed:req.body.matchesplayed,
    kd:req.body.kd
    },
      {
        where: {
          userid: req.body.userid
        }
      })
      .then(function(dbStat) {
        res.json(dbStat);
      });
  });
}
