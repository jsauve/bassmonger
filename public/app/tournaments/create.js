angular.module('bassmonger')
    .controller('tournaments.create',['$scope', '$state', 'resources', function($scope, $state, resources){
        $scope.tournament = {};
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
        }
        function saveTournament(tournament){
            console.log($scope.tournament);
            var tournamentResource = new resources.Tournaments();
            angular.extend(tournamentResource,tournament);
            tournamentResource.$save().then(function(success){
                console.log(success);
                $state.go('home');
            },function(error){
                console.log(error);
            });
        }

        $scope.save = saveTournament;
    }]);

