angular.module('bassmonger')
    .controller('home',['$scope', 'resources',function($scope, resources){
        $scope.tournaments = [];
    }]);