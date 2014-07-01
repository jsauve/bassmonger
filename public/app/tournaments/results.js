angular.module('bassmonger')
    .controller('tournaments.results',['$scope', '$state', 'resources', 'scoringService', function($scope, $state, resources, scoringService){
        resources.TournamentResults.get({tournamentId:$state.params.tournamentId}).$promise.then(function(results){
            var teamBassRank = _.sortBy(results,'bigBass').reverse();
            angular.forEach(results,function(line){
                line.bigBassRank = teamBassRank.indexOf(line) + 1;
            });
            $scope.results = scoringService().determineWinnersByResults(results);
        },function(error){
            console.log(error);
        });

        resources.Tournaments.get({_id:$state.params.tournamentId}).$promise.then(function(tournament){
            $scope.tournament = tournament;
        },function(error){
           console.log(error);
        });

    }]);
