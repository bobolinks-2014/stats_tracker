  app.controller('ScoreKeepersCtrl', ['$http',function($http){

    //coordinate hash to store the x and y coordinates of a mouse click
    var coordinates = {
      x: 0,
      y: 0
    };

    // functions to collect the x and y variables.
    var getX = function(event){
      return event.offsetX
      // debugger;
    };

     var getY = function(event){
      return event.offsetY
      // debugger;
    };

    // Stats constructor function. Sets up the type of function based on its stat_type
    // 1) Shot missed
    // 2) Shot made
    // 3) Rebound
    // 4) Steal
    // 5) Turnover
    // 6) Block

    function Stats(event, type){
      if(type === 1){
        this.field_goal = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          made: false,
          stat_type: 1
        };
      } else if(type === 2) {
          this.field_goal = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          made: true,
          stat_type: 2
        };
      } else if(type === 3) {
        this.rebound = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          stat_type: 3
        };
      } else if(type === 4){
        this.steal = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          stat_type: 4
        };
      } else if(type === 5){
        this.turnover = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          stat_type: 5
        };
      } else if(type === 6){
        this.block = {
          game_id: null,
          x: getX(event),
          y: getY(event),
          stat_type: 6
        };
      }
    };

    //Stats are default to missed shots
    this.type = 1;
    // debugger;

    //Empty arrays to contain all stat objects
    this.missed_fieldgoals = [];
    this.made_fieldgoals = [];
    this.rebounds = [];
    this.steals = [];
    this.turnovers = [];
    this.blocks = [];


    //test variable and function
    this.test = 0;
    this.clicky = function(){
      this.test++;
    };

    //Method that sets the type of stat to be recorded
    this.selectType = function(setType){
      this.type = setType;
    };

    //Method to make dots
    var i = 0;
    var makedots = function(event){
      i++;
      $('.court').append("<div class ='dot dot"+i+"'></div>");
      $('.dot'+i).css({'top':event.y, 'left':event.x});
    };


    //function that records a stat object and pushes it in its corresponding array.
    this.recordStats = function(event, type){
      if(type === 1){
        this.missed_fieldgoals.push(new Stats(event, this.type));
        makedots(event);
        // debugger;
      } else if(type === 2){
        this.made_fieldgoals.push(new Stats(event, this.type));

      } else if(type === 3) {
        this.rebounds.push(new Stats(event, this.type));

      } else if(type === 4) {
        this.steals.push(new Stats(event, this.type));

      } else if(type === 5) {
        this.turnovers.push(new Stats(event, this.type));

      } else if(type === 6){
        this.blocks.push(new Stats(event, this.type));
      };
    };
}]);













