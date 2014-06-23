angular.module('bassmonger')
    .controller('home',['$scope', 'resources',function($scope, resources){
        $scope.tournaments = [];
        resources.Standings.get().$promise.then(function(standings){
            addBigBassRankings(standings);
            $scope.standings = standings;

        },function(error){
            console.log(error);
        });

        resources.Tournaments.query().$promise.then(function(tournaments){
            $scope.tournaments = tournaments;
        },function(error){
            console.log(error);
        });

        function addBigBassRankings(standings){
            var teamBassRank = _.sortBy(standings,'bigBass').reverse();
            angular.forEach(standings,function(line){
                line.bigBassRank = teamBassRank.indexOf(line) + 1;
            });
            $scope.standings = standings;
        }

    }]);