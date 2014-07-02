angular.module('bassmonger')
    .controller('teams.bags',['$scope', '$state', 'resources',function($scope, $state, resources) {
        resources.Teams.get({_id:$state.params.teamId}).$promise.then(function(team){
            $scope.team = team;
        },function(error){
            console.log(error);
        });

        resources.Teams.query({_id:$state.params.teamId,controller:'bags'}).$promise.then(function(bags){
            $scope.bags = bags;
            aggregateData(bags);
        }, function(error){
            console.log(error);
        });

        function aggregateData(bags){
            $scope.totalBass = _.reduce(bags,function(memo,bag) {
                if (bag.numberOfBass) {
                    return memo + bag.numberOfBass;
                }
                return memo;
            },0);
            $scope.totalPike = _.reduce(bags,function(memo,bag){
                if(bag.numberOfPike) {
                    return memo + bag.numberOfPike;
                }
                return memo;
            },0);
            $scope.totalWalleye = _.reduce(bags,function(memo,bag){
                if(bag.numberOfWalleyes) {
                    return memo + bag.numberOfWalleyes;
                }
                return memo;
            },0);
            $scope.totalCrappie = _.reduce(bags,function(memo,bag){
                if(bag.numberOfCrappies) {
                    return memo + bag.numberOfCrappies;
                }
                return memo;
            },0);
            $scope.totalBluegill = _.reduce(bags,function(memo,bag){
                if(bag.numberOfBluegills) {
                    return memo + bag.numberOfBluegills;
                }
                return memo;
            },0);
            $scope.biggestBass = _.max(bags,function(bag){
                if(bag.bigBass.weight){
                    return bag.bigBass.weight;
                }
                return 0;
            });
            $scope.totalWeight = _.reduce(bags,function(memo,bag){
                return memo + bag.totalWeight;
            },0)
        }
    }]);