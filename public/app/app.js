angular.module('bassmonger',[
    'ui.router'
])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('');

        $stateProvider.state('tournaments-list',{
            url: '/tournaments',
            templateUrl:'/app/tournaments/list.html',
            controller:'tournaments.list'
        })
            .state('home',{
                url:'',
                title:'Bassmonger',
                templateUrl:'/app/home/home.html',
                controller:'home'
            })
            .state('login',{
                url:'/login',
                title:'Login',
                templateUrl:'/app/login/login.html',
                controller:'login'
            })
            .state('tournaments-details',{
                url:'/tournaments/:tournamentId',
                title:'Tournament',
                templateUrl:'/app/tournaments/details.html',
                controller:'tournaments.details'
            })
    }])
    .run([function(){

    }]);

