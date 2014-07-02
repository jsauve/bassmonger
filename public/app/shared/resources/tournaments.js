angular.module('bassmonger.resources', ['ngResource'])
    .factory('Tournaments', [
        '$resource', function($resource) {
            return $resource('/api/v1/tournaments/:_id',
                { _id: '@_id'  },
                {
                    'update': { method: 'PUT' }
                });
        }
    ])
    .factory('Teams', [
        '$resource', function($resource) {
            return $resource('/api/v1/teams/:_id/:controller',
                {
                    _id: '@_id',
                    controller:'@controller'
                },
                {
                    'update': { method: 'PUT' }
                });
        }
    ])
    .factory('Bags',[
        '$resource', function($resource){
            return $resource('/api/v1/tournaments/:tournamentId/bags/:_id',
                {
                    tournamentId:'@tournamentId',
                    _id:'@_id'
                },
                {
                    'update':{method:'PUT'}
                });
        }
    ])
    .factory('Standings',[
        '$resource', function($resource){
            return $resource('/api/v1/standings',{},
                {
                    'get':{
                        method:'GET',
                        isArray:true
                    }
                });
        }
    ])
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
    ])
    .factory('Users',[
        '$resource', function($resource){
            return $resource('/api/v1/users/:token',
                {
                    token:'@token'
                });
        }
    ]);