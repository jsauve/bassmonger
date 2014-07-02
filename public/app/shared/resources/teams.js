angular.module('bassmonger.resources')
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
    ]);