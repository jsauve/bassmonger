angular.module('bassmonger')
    .controller('teammembers.create',['$scope','$modalInstance',function($scope, $modalInstance) {
        $scope.teamMember = {};

        $scope.save = function(){
            $modalInstance.close($scope.teamMember);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);
