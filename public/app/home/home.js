angular.module('bassmonger')
    .controller('home',['$scope',function($scope){
        $scope.tournaments = [{name:'White Bear', id:'12345'},{name:'Coon',id:'67890'}];
    }]);