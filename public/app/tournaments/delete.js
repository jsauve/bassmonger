angular.module('bassmonger')
    .controller('tournaments.delete',['$scope', '$modalInstance', '$state',function($scope, $modalInstance, $state) {
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
            $modalInstance.dismiss('cancel');
        }
        $scope.ok = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);
