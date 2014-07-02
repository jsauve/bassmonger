angular.module('bassmonger.resources', ['ngResource'])
    .factory('Tournaments', [
        '$resource', function($resource) {
            return $resource('/api/v1/tournaments/:_id',
                { _id: '@_id'  },
                {
                    'update': { method: 'PUT' }
                });
        }
    ]);