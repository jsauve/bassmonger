angular.module('bassmonger')
    .controller('teams.create',['$scope', '$modal', '$state', 'resources',function($scope, $modal, $state, resources) {
        $scope.team = {members:[]};
        if(!$scope.user.isAdmin){
            $state.go('unauthorized');
        }
        function saveTeam(team){
            var teamResource = new resources.Teams();
            angular.extend(teamResource,team);
            teamResource.$save().then(function(success){
                console.log(success);
            },function(error){
                console.log(error);
            });
        }

        $scope.save = saveTeam;

        $scope.addTeamMember = function(){
            var modalInstance = $modal.open({
                templateUrl: '/app/teams/team-members/create.html',
                controller: 'teammembers.create'
            });
            modalInstance.result.then(function(result) {
                $scope.team.members.push(result);
            },function(){
                console.log('cancelled');
            });
        };
    }]);
