// This is related to Angular app
@score = angular.module('score',[]);

// Angular routing directive: it tells us default route for app
//   - we're actually not going to use this

@score.config(['$routeProvider', ($routeProvider) ->
    $routeProvider.
        otherwise({
            templateUrl: '../templates/home.html',
            controller: 'DashboardCtrl'
        });
]);


