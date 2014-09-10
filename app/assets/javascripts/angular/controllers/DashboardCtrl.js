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
		this.always = true;
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

	this.isSet = function(rowName){
		return this.showRow[rowName];
	};

	this.isIdSet = function(which) {
		return (this[which] ? true : false);
	}

	this.clearWarningsFor = function(row) {
		this.showWarning[row] = false;
	}

	this.displayRow = function(row) {
		this.showRow[row] = true;
	}
	this.hideRow = function(row) {
		this.showRow[row] = false;
	}
	this.toggleRow = function(row) {
		this.showRow[row] = !this.showRow[row];
	}
	this.isRowVisible = function(row) {
		return this.showRow[row];
	}

	this.displayForm = function(row) {
		this.showForm[row] = true;
	}
	this.hideForm = function(row) {
		this.showForm[row] = false;
	}
	this.toggleForm = function(row) {
		this.showForm[row] = !this.showForm[row];
	}
	this.isFormVisible = function(row) {
		return this.showForm[row];
	}

	this.showRowGroup = function(obj, rowType) {
		switch(rowType) {
			case 'team':
				var openingRow = 'seasons';
				break;
			case 'season':
				var openingRow = 'games';
				break;
			default:
				console.log('shut up legs ' + rowType)
		};
		// close warning if it's open
		this.clearWarningsFor(openingRow);
		this.hideForm(openingRow);

		// always show next row if clicking on team/season div
		this.displayRow(openingRow);

		// this closes games row if you pick another team (openingRow would = seasons bc it's the *next* row to show)
		if (openingRow === "seasons") {
			this.hideRow("games");
			// added - this closes create a team
			this.hideForm("teams");
		}

		var obj = obj;
		// These are important: decide which derivatives are shown (seasons are shown that belong to this.team_id; games are shown that belong to this.season_id)
		switch(rowType) {
			case "team":
				this.team_id = obj.id;
				this.team_name = obj.name;
				break;
			case "season":
				this.season_id = obj.id;
				this.season_name = obj.name;
				break;
			default:
				alert("shut the hell up " + rowType);
		}
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
				return true;
			} else if (!this.anyExist(formName)){
				return true;
			} else {
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

	this.panic = function(data, status, headers, config){
		console.log("ERROR :(");
		console.log("http: "+status);
		console.log(headers);
		console.log(config);
	};

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
	.error(this.panic);

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
			.error(this.panic);
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
			.error(this.panic);
		});
	}

}]);
