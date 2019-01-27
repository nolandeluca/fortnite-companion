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


  //GET BY EMAIL
  app.get("/api/stats/login/:loginid", function(req, res) {
    db.Stat.findAll({
      where: {
        loginid: req.params.loginid
      }
    }).then(function(dbStat) {
      res.json(dbStat);
    });
  });


//GET Friend by age
  app.get("/api/stats/age/:age/:gamemode", function(req, res) {
    db.Stat.findAll({
      where: {
        age: req.params.age,
        gamemode: req.params.gamemode
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
          gamemode:req.body.gamemode,
          age:req.body.age,
          platform:req.body.platform,
          loginid:req.body.loginid

        }).then(function(dbStat) {
          res.json(dbStat);
        });
      });

        // PUT route for updating exisiting user info
  app.put("/api/stats", function(req, res) {
    db.Stat.update({
      userid: req.body.userid,
      kills: req.body.kills,
      wins:req.body.wins,
      matchesplayed:req.body.matchesplayed,
      kd:req.body.kd,
      gamemode:req.body.gamemode,
      age:req.body.age,
      platform:req.body.platform,
      loginid:req.body.loginid
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
