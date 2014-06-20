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
            return $resource('/api/v1/teams/:_id',
                { _id: '@_id'  },
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
    ]);