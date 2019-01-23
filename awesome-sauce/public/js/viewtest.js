$(document).ready(function () {
  $(".todo-container").empty();
  setTimeout(getTodos, 100);
  function getTodos() {
    $.get("/api/stats", function (data) {
      for (i = 0; i < data.length; i++) {
        $(".users").prepend('<tr><td>' + data[i].userid + '</td><td>' + data[i].platform.toUpperCase() + '</td><td>' + data[i].createdAt.substring(0,10) + '</td></tr>');

      }
    });
  }

  $("#search").on("click",getStatPlatform);
function getStatPlatform(){
  $(".platformlist").empty();
 var platform=$("#platform").val();
  $.get("/api/stats/"+platform, function (data) {

    for (i = 0; i < data.length; i++) {
      $(".platformlist").prepend('<tr><td>' + data[i].userid + '</td><td>' + data[i].matchesplayed + '</td><td>' + data[i].createdAt.substring(0,10) + '</td></tr>');

    }
  });
}

  $("#save").on("click", postTodos);


  function postTodos() {
    event.preventDefault();
    // checkDuplicates();
    var todo = {
      userid: $("#userid").val(),
      kills: $("#kills").val(),
      wins: $("#wins").val(),
      matchesplayed: $("#matches_played").val(),
      kd: $("#kd").val(),
      platform:$("#platform").val()
     
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
      kd: $("#kd").val()
     
    };
    $.get("/api/stats", function (data) {
     console.log("Reached here")
      for (i = 0; i < data.length; i++) {
        console.log(data[i].username);
        if(data[i].username=$("#userid").val())
        {
          
          updateStat(todo);
        }
        else{
          getTodos();
        }
      }
    });
  }

  function updateStat(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/stats",
      data:todo
      
    })
      .then(function() {
      });
  }

});
