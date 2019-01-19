// $.ajax({
//     url: 'api/todos',
//     method: "GET"
//   }).then(function(response) {
//       console.log(response)

//   });
$(document).ready(function () {
  $(".todo-container").empty();
  setTimeout(getTodos, 100);
  function getTodos() {
    $.get("/api/stats", function (data) {
      console.log(data)
      for (i = 0; i < data.length; i++) {
        $(".todo-container").prepend('<p>' + data[i].userid + '</p>');
      }
    });
  }

  //getTodos();
  $("#save").on("click", postTodos);


  function postTodos() {
    event.preventDefault();
    checkDuplicates();
    var todo = {
      userid: $("#userid").val(),
      kills: $("#kills").val(),
      wins: $("#wins").val(),
      matchesplayed: $("#matches_played").val(),
      kd: $("#kd").val()
     
    };
    $.post("/api/stats", todo, function (dbStat) {
      console.log(dbStat);
      $(".todo-container").empty(); 
      //checkDuplicates();
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
      for (i = 0; i < data.length; i++) {
        console.log(data[i].username);
        if(data[i].username=$("#userid").val())
        {
          
          updateStat(todo);
          console.log('Already Exists')
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
       console.log('Added');
      });
  }

});
