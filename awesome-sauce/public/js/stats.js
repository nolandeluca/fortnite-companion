var user_id;
var killStats = [];

$("#stat").on('click', function (e) {
    platform = $(".browser-default").val()
    //delucanolan
    e.preventDefault();
    var username = $("#userid").val().trim();
    var queryURL = "https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=" + username;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.uid)
        user_id = response.uid;
        setTimeout(showstats, 3);

    });
})




function showstats() {
    console.log(platform)
    var queryURL = "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id=" + user_id + "&platform=" + platform;
    var html = "";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //  console.log(response.platforms[1])


        $("#kills").val(response.totals.kills);
        $("#wins").val(response.totals.wins);
        $("#matches_played").val(response.totals.matchesplayed);
        $("#kd").val(response.totals.kd);
        $("#score_solo").val(response.stats.score_solo);
        killStats.push(response.stats.kills_solo, response.stats.kills_duo, response.stats.kills_squad)

        //#######            CHART
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["Solo Kills", "Duo Kills", "Kill Squad"],
                datasets: [{
                    label: "Kills",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: killStats,
                }]
            },

            // Configuration options go here
            options: {}
        });

        //CHART END

    });

}