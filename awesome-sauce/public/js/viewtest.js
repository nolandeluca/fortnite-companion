$(document).ready(function () {
  $(".todo-container").empty();
  setTimeout(getTodos, 100);
  function getTodos() {
    $.get("/api/stats", function (data) {
      for (i = 0; i < data.length; i++) {
        $(".users").prepend('<tr><td>' + data[i].userid + '</td><td>' + data[i].loginid + '</td><td>' + data[i].createdAt.substring(0, 10) + '</td></tr>');

      }
    });
  }

  $("#search").on("click", getStatPlatform);
  function getStatPlatform() {
    $(".platformlist").empty();
    var platform = $("#platform").val();
    $.get("/api/stats/" + platform, function (data) {

      for (i = 0; i < data.length; i++) {
        $(".platformlist").prepend('<tr><td>' + data[i].userid + '</td><td>' + data[i].matchesplayed + '</td><td>' + data[i].createdAt.substring(0, 10) + '</td></tr>');

      }
    });
  }

  //Friend finder
  $("#find").on("click", getfriend);
  function getfriend() {
    $(".platformlist").empty();
    var age = $("#age").val();
    var gamemode = $("#gamemode").val();

    $.get("/api/stats/age/" + age + "/" + gamemode, function (data) {
      console.log(data)
      for (i = 0; i < data.length; i++) {
        $(".platformlist").prepend('<tr><td>' + data[i].userid + '</td><td>' + data[i].matchesplayed + '</td><td>' + data[i].platform + '</td></tr>');

      }
    });
  }

  $("#save").on("click", function () {
    event.preventDefault();
    console.log($("#welcome").html());
    if ($("#welcome").html() == " ") {

      $("#thislogin").text('Login to save your result - Click Here')
    }
    else {
      postTodos();
    }
  });



  function postTodos() {

    checkDuplicates();
    var todo = {
      userid: $("#userid").val(),
      kills: $("#kills").val(),
      wins: $("#wins").val(),
      matchesplayed: $("#matches_played").val(),
      kd: $("#kd").val(),
      platform: $("#platform").val(),
      loginid: $("#welcome").html().slice(9),
      gamemode: $("#gamemode").val(),
      age: $("#age").val()
     
    };
    $.post("/api/stats", todo, function (dbStat) {

      $(".todo-container").empty();
      alert("Added")

    });
  }


  function checkDuplicates() {
    var todo = {
      userid: $("#userid").val(),
      kills: $("#kills").val(),
      wins: $("#wins").val(),
      matchesplayed: $("#matches_played").val(),
      kd: $("#kd").val(),
      platform: $("#platform").val(),
      loginid: $("#welcome").html().slice(9),
      gamemode: $("#gamemode").val(),
      age: $("#age").val()
    };
    $.get("/api/stats", function (data) {
      for (i = 0; i < data.length; i++) {
        if (data[i].username = $("#userid").val()) {
          updateStat(todo);
          break;
        }
        else {
          getTodos();
        }
      }
    });
  }

  function updateStat(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/stats",
      data: todo

    })
      .then(function () {

      });
  }

});
