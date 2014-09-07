// dashboard.controller 'DashboardCtrl', ['$scope', ($scope) ->

// ]

	app.controller('DashboardCtrl', ['$http',function($http){
	// function DashboardCtrl($scope){
		this.row = 0;
		this.team_id = null;
		this.season_id = null;

		this.selectRow = function(setRow){
			this.row = setRow;
		};

		this.isSet = function(rowName){
			return this.row === rowName;
		};

		this.showDerivative = function(idObj,setRow){
			this.selectRow(setRow);
			this.team_id = idObj.team;
			this.season_id = idObj.season;
		}
		var that = this;
		this.teams = [];
		this.seasons = [];
		// this.games = [];

		// this.teams = data_teams;
		// this.seasons = data_seasons;
		this.games = data_games;


		//getting all the teams
		$http({
			method: 'GET',
			url: '/user/1/teams.json'
		}).
		success(function(data, status, headers, config){
			that.teams = data;
		}).
		error(function(data, status, headers, config){
			debugger;
		})

		//getting a season
		$http({
			method: 'GET',
			url: '/user/1/team/1/seasons.json'
		}).
		success(function(data, status, headers, config){
			that.seasons = data;
		}).
		error(function(data, status, headers, config){
			debugger;
		})

		//getting a game
		$http({
			method: 'GET',
			url: '/user/1/season/1/games.json'
		}).
		success(function(data, status, headers, config){
			that.games = data;
			debugger;
		}).
		error(function(data, status, headers, config){
			debugger;
		})








	}]);



	var data_seasons = [{
		id: 3,
		name: "2015",
		team_id: 1
	},
	{
		id: 2,
		name: "2014",
		team_id: 2
	},
	{
		id: 1,
		name: 2013,
		team_id: 2
	}]
	var data_games = [{
		date: "01/30",
		location: "home",
		opponent: "Pistons",
		win: true,
		team_score: 60,
		opponent_score: 54,
		season_id: 3
	},
	{
		date: "01/28",
		location: "home",
		opponent: "Hawks",
		win: false,
		team_score: 40,
		opponent_score: 54,
		season_id: 3
	},
	{
		date: "01/25",
		location: "away",
		opponent: "Knicks",
		win: true,
		team_score: 55,
		opponent_score: 51,
		season_id: 3
	},
	{
		date: "01/20",
		location: "home",
		opponent: "Celtics",
		win: true,
		team_score: 50,
		opponent_score: 43,
		season_id: 3
	},
	{
		date: "01/18",
		location: "away",
		opponent: "Hornets",
		win: false,
		team_score: 60,
		opponent_score: 64,
		season_id: 3
	}]











