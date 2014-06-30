angular.module('bassmonger')
    .controller('bags.create',['$scope', '$modalInstance', 'resources', function($scope, $modalInstance, resources){
        $scope.bag = {};
        resources.Teams.query().$promise.then(function(teams){
            $scope.teams = teams;
        },function(error){
           console.log(error);
        });
        $scope.cancel=function(){
            $modalInstance.dismiss('cancel');
        };

        $scope.save=function(){
            $modalInstance.close($scope.bag);
        };
    }]);