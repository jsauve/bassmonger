angular.module('bassmonger')
    .controller('tournaments.list',['$scope',function($scope){
        $scope.title = 'Hello WOrld';
        $scope.tournies =[{lake:'White Bear',name:'Test Tourney'},{lake:'Bald Eagle', name:'Test Tourney 2'}];
    }]);
