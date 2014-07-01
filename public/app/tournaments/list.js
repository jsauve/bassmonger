angular.module('bassmonger')
    .controller('tournaments.list',['$scope', '$modal', 'resources', function($scope, $modal, resources){
        resources.Tournaments.query().$promise.then(function(tournaments){
           $scope.tournaments = tournaments;
        },function(error){
            console.log(error);
        });

        function deleteTournament(tournament){
            var modalInstance = $modal.open({
                templateUrl: '/app/tournaments/delete.html',
                controller: 'tournaments.delete'
            });
            modalInstance.result.then(function(result) {
                tournament.$delete().then(function(success){
                    $scope.tournaments.splice($scope.tournaments.indexOf(tournament),1);
                },function(error){
                    console.log(error);
                });
            },function(){
                console.log('cancelled');
            });
        }

        $scope.deleteTournament = deleteTournament;
    }]);
