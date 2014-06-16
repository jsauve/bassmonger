angular.module('bassmonger',[
    'ui.router',
    'bassmonger.login'
])
    .config([function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('tournaments-list',{
            url: '/tournaments',
            templateUrl:'/tournaments/list',
            controller:'tournaments.list'
        })
            .state('login',{
                url:'/login',
                templateUrl:'login/login',
                controller:'bassmonger.login'
            })
    }])
    .run([function(){

    }]);

