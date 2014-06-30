angular.module('bassmonger')
    .controller('tournaments.delete',['$scope','$modalInstance',function($scope, $modalInstance) {

        $scope.ok = function(){
            $modalInstance.close();
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);
