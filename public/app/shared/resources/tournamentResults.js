angular.module('bassmonger.resources')
    .factory('TournamentResults',[
        '$resource', function($resource){
            return $resource('/api/v1/tournaments/:tournamentId/results',
                {
                    tournamentId:'@tournamentId'
                },
                {
                    'get':{
                        method:'GET',
                        isArray:true
                    }
                });
        }
    ]);