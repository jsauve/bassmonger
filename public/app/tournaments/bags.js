angular.module('bassmonger-admin')
    .controller('tournaments.bags',['$scope', '$state', '$modal', 'resources', function($scope, $state, $modal, resources){
        $scope.tournament = {};
        $scope.bags = [];

        resources.Tournaments.get({_id:$state.params.tournamentId}).$promise.then(function(tournament){
            $scope.tournament = tournament;
        },function(error){
            console.log(error);
        });

        resources.Bags.query({tournamentId:$state.params.tournamentId}).$promise.then(function(bags){
            $scope.bags = bags;
            angular.forEach($scope.bags,function(bag){
                resources.Teams.get({_id:bag.teamId}).$promise.then(function(team){
                    bag.team = team;
                },function(error){
                    console.log(error);
                });
            });
        },function(error){
            console.log(error);
        });

        function saveTournament(tournament){
            tournament.$save().then(function(success){
                console.log(success);
                $state.go('home');
            },function(error){
                console.log(error);
            });
        }

        function addBag(){
            var modalInstance = $modal.open({
                templateUrl: '/app/tournaments/bags/create.html',
                controller: 'bags.create',
                resolve:{
                    resources:
                        ['Teams',function(Teams){
                            return {Teams:Teams};
                        }
                    ]
                }
            });

            modalInstance.result.then(function(result) {
                var bagResource = new resources.Bags();
                angular.extend(bagResource,result);
                bagResource.tournamentId = $state.params.tournamentId;
                bagResource.$save().then(function(success){
                    $scope.bags.push(result);
                },function(error){
                    console.log(error);
                });
            },function(){
                console.log('cancelled');
            });
        }

        $scope.addBag = addBag;
        $scope.save = saveTournament;
    }]);

