angular.module('bassmonger')
    .controller('teams.list',['$scope','resources',function($scope, resources) {
        $scope.teams = [];

        resources.Teams.query().$promise.then(function(teams){
            $scope.teams = teams;
        },function(error){
           console.log(error);
        });
    }]);
