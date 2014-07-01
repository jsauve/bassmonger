angular.module('bassmonger')
    .controller('tournaments.edit',['$scope', '$state', '$stateParams', 'resources', function($scope, $state, $stateParams, resources){
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
        }

        resources.Tournaments.get({_id:$stateParams.tournamentId}).$promise.then(function(tournament){
            $scope.tournament = tournament;
        },function(error){
            console.log(error);
        });

        function saveTournament(tournament){
            tournament.update().then(function(success){
                $state.go('tournaments-list');
            },function(error){
                console.log(error);
            })
        }

        $scope.saveTournament = saveTournament;
    }]);
