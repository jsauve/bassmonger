angular.module('bassmonger.resources')
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