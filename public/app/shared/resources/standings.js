angular.module('bassmonger.resources')
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
    ]);