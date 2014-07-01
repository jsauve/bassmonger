angular.module('bassmonger')
    .controller('bags.create',['$scope', '$modalInstance', 'resources', '$state', function($scope, $modalInstance, resources, $state){
        $scope.bag = {};
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
            $modalInstance.dismiss('cancel');
        }
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