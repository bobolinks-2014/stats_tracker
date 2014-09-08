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
		this.showForm = {'teams': false, 'seasons': false, 'games': false};

	// Selected team or season
		this.team_id = null;
		this.season_id = null;
		// Set these so the Create New forms include name
			this.team_name = null;
			this.season_name = null;

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
		var stuff = that.newTeamInfo;
		$http({
			method: "POST",
			url: '/team.json',
			data: stuff
		})
		.success(function (data, status, headers, config) {
			that.teams.push(data);
			that.showForm['teams'] = false;
			that.newTeamInfo = {};
		})
		.error(function (data, status, headers, config) {
			console.log("ERROR: "+status)
			console.log(data);
		});
	};

//  === ADD ZE NEW SEASON ===
//
	this.addNewSeason = function(){
		var stuff = that.newSeasonInfo;
		stuff.team_id = that.team_id;
		// debugger;
		$http({
			method: "POST",
			url: '/season.json',
			data: stuff
		})
		.success(function (data, status, headers, config) {
			that.seasons.push(data);
			that.showForm['seasons'] = false;
			that.newSeasonInfo = {};
		})
		.error(function (data, status, headers, config) {
			console.log("ERROR: "+status)
			console.log(data);
		});
	};

//  === ADD ZE NEW GAME ===
//
	this.addNewGame = function(){
		var stuff = that.newGameInfo;
		stuff.season_id = that.season_id;
		$http({
			method: "POST",
			url: '/game.json',
			data: stuff
		})
		.success(function (data, status, headers, config) {
			that.games.push(data);
			that.showForm['games'] = false;
			that.newGameInfo = {};
		})
		.error(function (data, status, headers, config) {
			console.log("ERROR: "+status)
			console.log(data);
		});
	};


//  === DISPLAY ZE ROWS ===
//

	// Oscillate between true / false
	this.selectRow = function(rowName){
		this.showRow[rowName] ? this.showRow[rowName] = false : this.showRow[rowName] = true;
	};

	this.isSet = function(rowName){
		return this.showRow[rowName];
	};

	this.showDerivative = function(idObj,rowName){
		// always show next row if clicking on team/season div
		this.showRow[rowName] = true;


		this.showForm[rowName] = false;

		// this closes games row if you pick another team (rowName would = seasons bc it's the *next* row to show)
		if (rowName === "seasons"){
			this.showRow["games"] = false;

			// added - this closes create a team
			this.showForm["teams"] = false;
		}

		// These are important: decide which derivatives are show (seasons are shown that belong to this.team_id; games are shown that belong to this.season_id)
		this.team_id = idObj.teamId || this.team_id;
		this.season_id = idObj.seasonId || this.season_id;

		// These are just for showing name on Create New forms
		this.team_name = idObj.teamName || this.team_name;
		this.season_name = idObj.seasonName || this.season_name;
	};

//  === DISPLAY ZE FORMS ===
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
			that.getAllSeasons();
	})
	.error(function(data, status, headers, config){
		console.log("ERROR :(");
		console.log("http: "+status);
		console.log(headers);
		console.log(config);
	});

	// This is only called on the success of getting all teams
	// Input: none, grabs arrays of teams with that.teams
	this.getAllSeasons = function(){
		that.teams.forEach(function(team){
			$http({
					method: 'GET',
					url: '/user/1/team/' + team.id + '/seasons.json'
			})
			.success(function(data, status, headers, config){
					that.seasons = that.seasons.concat(data);
					that.getAllGames(data);
			})
			.error(function(data, status, headers, config){
				console.log("ERROR :(");
				console.log("http: "+status);
				console.log(headers);
				console.log(config);
			});
		});
	};

	// This is called on success of retriving a team's seasons
	// Input: array of season objects
	this.getAllGames = function(seasons) {
		seasons.forEach(function(season) {
			$http({
				method: 'GET',
				url: '/user/1/season/' + season.id + '/games.json'
			})
			.success(function(data, status, headers, config){
				that.games = that.games.concat(data);
			})
			.error(function(data, status, headers, config){
				console.log("ERROR :(");
				console.log("http: "+status);
				console.log(headers);
				console.log(config);
			});
		});
	}

}]);
