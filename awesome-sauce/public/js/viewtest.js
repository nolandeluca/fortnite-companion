// $.ajax({
//     url: 'api/todos',
//     method: "GET"
//   }).then(function(response) {
//       console.log(response)
     
//   });
$(document).ready(function() {
  $(".todo-container").empty();
  setTimeout(getTodos, 100);
  function getTodos() {
  $.get("/api/stats", function(data) {
    console.log(data)
    for(i=0;i<data.length;i++){
    $(".todo-container").prepend('<p>'+data[i].userid+'</p>');
  }
  });
}

//getTodos();
$("#save").on("click",postTodos);


function postTodos(){
  event.preventDefault();
  getTodos();
  var todo = {
      userid: $("#userid").val(),
      kills: $("#kills").val(),
      wins:$("#wins").val(),
      matchesplayed:$("#matches_played").val(),
      kd:$("#kd").val()
  };
    $.post("/api/stats",todo,function(dbStat){
      console.log(dbStat);
    
    });
}


});
