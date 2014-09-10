app.controller('DashboardCtrl', ['$http',function($http){
//  === SET ZE VARS ===
//
	// use that if afraid of scope issues
		var that = this;

	// Set Teams row to auto-display
		this.showRow = {'teams': true, 'seasons': false, 'games': false};

	// Which new forms are showing
		this.showForm = {'teams': false, 'seasons': false, 'games': false};

	// Regulates whether the "You must select a season/game first" warning shows
		this.showWarning = {'seasons': false, 'games': false, 'teams': false};

		this.closeAlert = function(row){
			this.showWarning[row] = false;
		}


	// Selected team or season
		this.team_id = 0;
		this.season_id = 0;
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

	// Date Formatting Stuff
	this.dateOpened = 
	this.openDate = function($event){
		$event.preventDefault();
		$event.stopPropagation();

		that.dateOpened = true;
	};
	this.dateOptions ={
		formatYear: 'yy',
		formatDay: 'd',
		formatMonth: 'M',
		startingDay:1,
		dropdownSelector: '#dropdown2'
	}
	this.today = function(){
		this.newGameInfo.date = new Date();
	};
	this.today();


//  === DISPLAY ZE ROWS ===
//

	// Oscillate between true / false
	this.selectRow = function(rowName){
		var which = {"seasons": "team_id", "games" : "season_id"}

		// If the PREVIOUS row's ID is set, then make current row clickable
		if (this.isIdSet(which[rowName])){
			// hide (if showing) alert
			this.showWarning[rowName] = false;

			// make current row clickable
			this.showRow[rowName] ? this.showRow[rowName] = false : this.showRow[rowName] = true;
		} else {
			this.showWarning[rowName] = true;
		}
	};

	this.isSet = function(rowName){
		return this.showRow[rowName];
	};

	this.isIdSet = function(which) {
		return (this[which] ? true : false);
	}

	this.showDerivative = function(idObj,openingRow){
		// close warning if it's open
		this.showWarning[openingRow] = false;

		// always show next row if clicking on team/season div
		this.showRow[openingRow] = true;

		this.showForm[openingRow] = false;

		// this closes games row if you pick another team (openingRow would = seasons bc it's the *next* row to show)
		if (openingRow === "seasons"){
			this.showRow["games"] = false;

			// added - this closes create a team
			this.showForm["teams"] = false;
		}

		// These are important: decide which derivatives are shown (seasons are shown that belong to this.team_id; games are shown that belong to this.season_id)
		this.team_id = idObj.teamId || this.team_id;
		this.season_id = idObj.seasonId || this.season_id;

		// These are just for showing name on Create New forms
		this.team_name = idObj.teamName || this.team_name;
		this.season_name = idObj.seasonName || this.season_name;
	};

//  === DISPLAY ZE FORMS ===
//
		this.shouldDisplay = function (formName) {
			// only check whether they clicked the + button for teams
			if (formName === "teams"){
				return this.showForm[formName];
			}

			// others: check + button pressed or if no games/seasons exist for selected season/team
			if (this.showForm[formName]){
				console.log(formName + " form: true")
				return true;
			} else if (!this.anyExist(formName)){
				console.log(formName + " form: true")
				return true;
			} else {
				console.log(formName + " form: false")
				return false;}
		};

		this.displayForm = function (formName) {
			this.showForm[formName] ? this.showForm[formName] = false : this.showForm[formName] = true;
		};

		// returns false if no games/seasons exist for selected season/team) 
		this.anyExist = function(formName){
			var which = {"seasons": "team_id", "games" : "season_id"}
			var exist = false;
			this[formName].forEach(function(elem){
				if (that[which[formName]] === elem[which[formName]]){
					exist = true;
				}
			});
			return exist;
		};


//  === GET ZE DATA ===
//
	//getting all the teams
	$http({
			method: 'GET',
			url: '/user/1/teams.json'
	})
	.success(function(data, status, headers, config){
			that.teams = that.teams.concat(data);
			if (that.teams.length === 0){
				that.showForm['teams'] = true;
			}
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
				if (that.seasons.length === 0){
					that.showForm['seasons'] = true;
				}
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
				if (that.games.length === 0){
					that.showForm['games'] = true;
				}
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
