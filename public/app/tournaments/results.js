angular.module('bassmonger')
    .controller('tournaments.results',['$scope', '$state', 'resources', function($scope, $state, resources){
        resources.TournamentResults.get({tournamentId:$state.params.tournamentId}).$promise.then(function(results){
            var teamBassRank = _.sortBy(results,'bigBass').reverse();
            angular.forEach(results,function(line){
                line.bigBassRank = teamBassRank.indexOf(line) + 1;
            });
            determineWinners(results);
            $scope.results = results;
        },function(error){
            console.log(error);
        });

        function determineWinners(results){
            var copyOfResults = results.slice(0);

            var biggestBass = _.max(copyOfResults,'bigBass');

            biggestBass.isBigBassWinner = true;
            biggestBass.class = 'bigBass';
            copyOfResults = _.without(copyOfResults,biggestBass);
            var first = copyOfResults[0];
            var second = copyOfResults[1];
            var third = copyOfResults[2];
            var fourth = copyOfResults[3];

            if(first && first.total > 0){
                first.class = 'firstPlace';
                first.isFirstPlace = true;
            }
            if(second && second.total > 0){
                second.class='secondPlace';
                second.isSecondPlace=true;
            }
            if(third && third.total > 0){
                third.class = 'thirdPlace';
                third.isThirdPlace=true;
            }
            if(fourth && fourth.total > 0){
                fourth.class = 'fourthPlace';
                fourth.isFourthPlace=true;
            }
        }
    }]);
