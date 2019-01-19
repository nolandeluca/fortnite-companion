// Require the model

var db = require("../models");

//GET
module.exports = function(app){
  // GET route for getting all of the todos
  app.get("/api/stats", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Stat.findAll({}).then(function(dbStat) {
      // We have access to the todos as an argument inside of the callback function
      console.log(dbStat);
      res.json(dbStat);
    });
  });

    app.post("/api/stats", function(req, res) {
    
        db.Stat.create({
          userid: req.body.userid,
          kills: req.body.kills,
          wins:req.body.wins,
          matchesplayed:req.body.matchesplayed,
          kd:req.body.kd
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








































// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };


// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
//};