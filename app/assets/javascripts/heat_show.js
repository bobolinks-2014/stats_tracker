
$(document).ready(function(){
  var heatmapInstance = h337.create({
    container: document.querySelector('.heat_court'),
  });
  //generating sudo data

  var fieldgoals = data_fieldgoals;
  var points = [];
  var max = 100;
  var width = 1200;
  var height = 750;
  var fieldgoalNum = fieldgoals.length

  var setVal = function(array){
    if(array){
      return 100
    } else {
      return 0
    }
  };

  while ( fieldgoalNum--) {
    var val = setVal(fieldgoals[fieldgoalNum].made);
    var radius = 40;
    max = Math.max(max, val);

    var point = {
      x: fieldgoals[fieldgoalNum].x,
      y: fieldgoals[fieldgoalNum].y,
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

});

var data_fieldgoals = [{
  made: true,
  stat_type: 2,
  x: 752,
  y: 331
},
{
  made: true,
  stat_type: 2,
  x: 800,
  y: 200
},
{
  made: false,
  stat_type: 2,
  x: 500,
  y: 300
},
{
  made: true,
  stat_type: 2,
  x: 200,
  y: 600
},
{
  made: false,
  stat_type: 2,
  x: 500,
  y: 900
},
{
  made: true,
  stat_type: 2,
  x: 100,
  y: 600
},
{
  made: true,
  stat_type: 2,
  x: 200,
  y: 1000
},
{
  made: true,
  stat_type: 2,
  x: 200,
  y: 1000
},
{
  made: true,
  stat_type: 2,
  x: 100,
  y: 100
},
{
  made: true,
  stat_type: 2,
  x: 900,
  y: 600
},
{
  made: false,
  stat_type: 2,
  x: 200,
  y: 800
},
{
  made: false,
  stat_type: 2,
  x: 700,
  y: 200
},
{
  made: false,
  stat_type: 2,
  x: 400,
  y: 300
},
{
  made: false,
  stat_type: 2,
  x: 600,
  y: 200
},
{
  made: false,
  stat_type: 2,
  x: 100,
  y: 900
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 400
},
{
  made: false,
  stat_type: 2,
  x: 900,
  y: 200
},
{
  made: false,
  stat_type: 2,
  x: 1100,
  y: 300
},
{
  made: false,
  stat_type: 2,
  x: 900,
  y: 300
},
{
  made: false,
  stat_type: 2,
  x: 800,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 800,
  y: 200
},
//////////////////////////////////////////////////////////////////////////////////////
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: true,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: true,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: true,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: true,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: true,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
},
{
  made: false,
  stat_type: 2,
  x: 1000,
  y: 500
}]
































