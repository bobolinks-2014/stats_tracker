// dashboard.controller 'DashboardCtrl', ['$scope', ($scope) ->

// ]

app.controller('DashboardCtrl', ['$http',function($http){
//  === SET ZE VARS ===
// 
	// use that if afraid of scope issues
		var that = this;

	// Set Teams row to auto-display
		this.showRow = {'teams': true, 'seasons': false, 'games': false};

	// Which new forms are showing
		this.showForm = {'team': false, 'season': false, 'game': false};

	// Set these to view specific team's season or specific season's games
		this.team_id = null;
		this.season_id = null;

	// User's data to display
		this.teams = [];
		this.seasons = [];
		this.games = [];

	// Temporary New Info Storage
		this.newTeamInfo = {};
		this.newSeasonInfo = {};
		this.newGameInfo = {};

//  === ADD ZE NEW TEAM ===
// 
	this.addNewTeam = function(){
		that.teams.push(that.newTeamInfo);
		that.showForm['team'] = false;
		that.newTeamInfo = {};
		// $http({
		// 		method: "POST",
		// 		url: '/team.json'
		// 	})

		
	};

//  === ADD ZE NEW SEASON ===
// 
	this.addNewSeason = function(team_id){
		debugger;
		this.seasons.push(this.newSeasonInfo);
		this.showForm['season'] = false;
		this.newSeasonInfo = {};
	};

//  === HAVE ZE ROW DISPLAYED FUNCTIONS ===
// 
	// Oscillate between true / false
	this.selectRow = function(rowName){
		this.showRow[rowName] ? this.showRow[rowName] = false : this.showRow[rowName] = true;
	};

	this.isSet = function(rowName){
		return this.showRow[rowName];
	};

	this.showDerivative = function(idObj,rowName){
		this.selectRow(rowName);
		this.team_id = idObj.team || this.team_id;
		this.season_id = idObj.season || this.season_id;
	};
	
//  === HAVE ZE FORMS DISPLAYED FUNCTIONS ===
// 
	// 
	this.shouldDisplay = function (formName) {
		return this.showForm[formName];
	};

	this.displayForm = function (formName) {
		this.showForm[formName] ? this.showForm[formName] = false : this.showForm[formName] = true;
	};

//  === GET ZE DATA ===
// 
	//getting all the teams
	$http({
			method: 'GET',
			url: '/user/1/teams.json'
		})
		.success(function(data, status, headers, config){
			that.teams = data;
			debugger;
		})
		.error(function(data, status, headers, config){
			// debugger;
	})	

	//getting a season
	$http({
			method: 'GET',
			url: '/user/1/team/1/seasons.json'
		})	
		.success(function(data, status, headers, config){
			that.seasons = data;
			// debugger; 
		})
		.error(function(data, status, headers, config){
			// debugger;
		})

	//getting a game
	$http({
			method: 'GET',
			url: '/user/1/season/1/games.json'
		})
		.success(function(data, status, headers, config){
			that.games = data;
			// debugger;
		})
		.error(function(data, status, headers, config){
			// debugger;
		})

}]);























	// var data_seasons = [{
	// 	id: 3,
	// 	name: "2015",
	// 	team_id: 1
	// },
	// {
	// 	id: 2,
	// 	name: "2014",
	// 	team_id: 2
	// },
	// {
	// 	id: 1,
	// 	name: 2013,
	// 	team_id: 2
	// }]
	// var data_games = [{
	// 	date: "01/30",
	// 	location: "home",
	// 	opponent: "Pistons",
	// 	win: true,
	// 	team_score: 60,
	// 	opponent_score: 54,
	// 	season_id: 3
	// },
	// {
	// 	date: "01/28",
	// 	location: "home",
	// 	opponent: "Hawks",
	// 	win: false,
	// 	team_score: 40,
	// 	opponent_score: 54,
	// 	season_id: 3
	// },
	// {
	// 	date: "01/25",
	// 	location: "away",
	// 	opponent: "Knicks",
	// 	win: true,
	// 	team_score: 55,
	// 	opponent_score: 51,
	// 	season_id: 3
	// },
	// {
	// 	date: "01/20",
	// 	location: "home",
	// 	opponent: "Celtics",
	// 	win: true,
	// 	team_score: 50,
	// 	opponent_score: 43,
	// 	season_id: 3
	// },
	// {
	// 	date: "01/18",
	// 	location: "away",
	// 	opponent: "Hornets",
	// 	win: false,
	// 	team_score: 60,
	// 	opponent_score: 64,
	// 	season_id: 3
	// }]