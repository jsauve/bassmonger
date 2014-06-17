angular.module('bassmonger')
    .controller('login',['$scope',function($scope){
        $scope.userCredentials = {username:'', password:''};
    }]);