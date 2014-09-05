// dashboard.controller 'DashboardCtrl', ['$scope', ($scope) ->

// ]

	App.controller('DashboardCtrl', ['$scope',function($scope){
		$scope.teams = [];
		$scope.seasons = [];
		$scope.games = [];

		$scope.teams = [{id: 1,name: "JV"},{id: 2,name: "Varsity"}];//data_teams;
		$scope.seasons = data_seasons;
		$scope.games = data_games;

	}]);


	var data_seasons = []
	var data_games = []

	var 