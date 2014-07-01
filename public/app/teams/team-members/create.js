angular.module('bassmonger')
    .controller('teammembers.create',['$scope','$modalInstance', '$state', function($scope, $modalInstance, $state) {
        $scope.teamMember = {};
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
            $modalInstance.dismiss('cancel');
        }
        $scope.save = function(){
            $modalInstance.close($scope.teamMember);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);
