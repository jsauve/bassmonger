angular.module('bassmonger.resources')
    .factory('Users',[
        '$resource', function($resource){
            return $resource('/api/v1/users/:token',
                {
                    token:'@token'
                });
        }
    ]);