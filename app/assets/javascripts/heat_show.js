
$(document).ready(function(){
    $(".heat_court_map").hide();

  $(".heatmap_button").click(function(){
    $(".heat_court_map").toggle();
  });
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

    var testArray = [];

    var getPointData = function(event){
      var pointObj = {
        x_coord: event.x - 370,
        y_coord: event.y - 65,
        value: 50,
        radius: 40
      };
      return pointObj;
    };
    $(".court").click(function(){
      dataPoints.push(getPointData(event))
    });


    //collects the datapoints that are clicked on the court.
    var dataPoints = [];

    $(".identifiers").on('click', '.fg_missed_button' ,function(){
      stat_data = dataMissedShots.concat(dataPoints);
      dataMissedShots = stat_data;
      setUpHeatmap(dataMissedShots);
      dataPoints = [];
      // $(this).addClass("on_missed")
    });

    $(".identifiers").on('click', '.fg_made_button' ,function(){
      stat_data = dataMadeShots.concat(dataPoints);
      dataMadeShots = stat_data;
      setUpHeatmap(dataMadeShots);
      dataPoints = [];
      // $(this).addClass("on_made")
    });

    $(".identifiers").on('click', '.rebound_button' ,function(){
      stat_data = dataRebounds.concat(dataPoints);
      dataRebounds = stat_data;
      setUpHeatmap(dataRebounds);
      dataPoints = [];
      // $(this).addClass("on_rebound")
    });

    $(".identifiers").on('click', '.steal_button' ,function(){
      stat_data = dataSteals.concat(dataPoints);
      dataSteals = stat_data;
      setUpHeatmap(dataSteals);
      dataPoints = [];
      // $(this).addClass("on_steal")
    });

    $(".identifiers").on('click', '.turnover_button' ,function(){
      stat_data = dataTurnovers.concat(dataPoints);
      dataTurnovers = stat_data;
      setUpHeatmap(dataTurnovers);
      dataPoints = [];
      // $(this).addClass("on_turnover")
    });

    $(".identifiers").on('click', '.block_button' ,function(){
      stat_data = dataBlocks.concat(dataPoints);
      dataBlocks = stat_data;
      setUpHeatmap(dataBlocks);
      dataPoints = [];
      // $(this).addClass("on_block")
    });

    $(".identifiers").on("click", ".clear_heatmap", function(){
      $('.heat_court_map').empty();
      // $('.heat_court').removeClass("on")
    });

  });


  var setUpHeatmap = function(stat) {

    var heatmapInstance = h337.create({
      container: document.querySelector('.heat_court_map'),
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
      var width = 1050;
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
