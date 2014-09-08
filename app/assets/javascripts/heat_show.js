
$(document).ready(function(){

    // $(".shots_missed").show();
    // $(".shots_made").hide();
    // $(".rebounds").hide();
    // $(".steals").hide();
    // $(".blocks").hide();
    // $(".turnovers").hide();

    var pathname = window.location.pathname;
    var data_fieldgoals = [];

    var ajaxRequest = $.ajax({
      type: 'GET',
      url: pathname+".json"
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



// var data_fieldgoals = [{
//   made: true,
//   stat_type: 2,
//   x: 752,
//   y: 331
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 800,
//   y: 200
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 500,
//   y: 300
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 200,
//   y: 600
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 500,
//   y: 900
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 100,
//   y: 600
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 200,
//   y: 1000
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 200,
//   y: 1000
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 100,
//   y: 100
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 900,
//   y: 600
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 200,
//   y: 800
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 700,
//   y: 200
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 400,
//   y: 300
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 600,
//   y: 200
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 100,
//   y: 900
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 400
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 900,
//   y: 200
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1100,
//   y: 300
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 900,
//   y: 300
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 800,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 800,
//   y: 200
// },
// //////////////////////////////////////////////////////////////////////////////////////
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: true,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// },
// {
//   made: false,
//   stat_type: 2,
//   x: 1000,
//   y: 500
// }]
