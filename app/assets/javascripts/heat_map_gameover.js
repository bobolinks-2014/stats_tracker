
$(document).ready(function(){
    // $(".heat_court_map").hide();


    // $(".shots_missed").show();
    // $(".shots_made").hide();
    // $(".rebounds").hide();
    // $(".steals").hide();
    // $(".blocks").hide();
    // $(".turnovers").hide();

    var pathname = window.location.pathname;
    // debugger;
    var data_fieldgoals = [];

    var gameId = parseInt($("#game_id").attr("value"));
    var ajaxRequest = $.ajax({
      type: 'GET',
      url: "/game/"+gameId+".json"
    });

      ajaxRequest.done(function(response){
        dataMissedShots = response.missed_shots;
        dataMadeShots = response.made_shots;
        dataRebounds = response.rebounds;
        dataSteals = response.steals;
        dataTurnovers = response.turnovers;
        dataBlocks = response.blocks;
      });

    $(".identifiers").on('click', '.fg_missed_button' ,function(){
      setUpHeatmap(dataMissedShots);
      // $(this).addClass("on_missed")
    });

    $(".identifiers").on('click', '.fg_made_button' ,function(){
      setUpHeatmap(dataMadeShots);

      // $(this).addClass("on_made")
    });

    $(".identifiers").on('click', '.rebound_button' ,function(){
      setUpHeatmap(dataRebounds);
      // $(this).addClass("on_rebound")
    });

    $(".identifiers").on('click', '.steal_button' ,function(){
      setUpHeatmap(dataSteals);
      // $(this).addClass("on_steal")
    });

    $(".identifiers").on('click', '.turnover_button' ,function(){
      setUpHeatmap(dataTurnovers);
      // $(this).addClass("on_turnover")
    });

    $(".identifiers").on('click', '.block_button' ,function(){
      setUpHeatmap(dataBlocks);
      // $(this).addClass("on_block")
    });

    $(".identifiers").on("click", ".clear_heatmap", function(){
      $('.heat_court').empty();
      // $('.heat_court').removeClass("on")
    });
});




  var setUpHeatmap = function(stat) {

  var heatmapInstance = h337.create({
    container: document.querySelector('.heat_court'),
  });
    // 1) Shot missed
    // 2) Shot made
    // 3) Rebound
    // 4) Steal
    // 5) Turnover
    // 6) Block

    // var missedFieldgoals = dataMissedShots;
    // var madeFieldgoals = dataMadeShots;
    // var rebounds = dataRebounds;
    // var steals = dataSteals;
    // var turnovers = dataTurnovers;
    // var blocks = dataBlocks;
    var statNum = stat.length;

    var points = [];
    var max = 100;
    var width = 1200;
    var height = 750;

    // var setVal = function(shotMade){
    //   if(shotMade){
    //     return 50;
    //   } else {
    //     return 0;
    //   }
    // };

    while ( statNum-- ) {
      var val = 50//setVal(missedFieldgoals[missedfieldgoalNum].made);
      var radius = 40;
      max = Math.max(max, val);

      var point = {
        x: stat[statNum].x_coord,
        y: stat[statNum].y_coord,
        value: val,
        radius: radius
      };
      points.push(point);
    }
    //heatmap data
    var data = {
      max: max,
      data: points
    };

    heatmapInstance.setData(data);
  };



