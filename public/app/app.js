angular.module('bassmonger',[
    'ngResource',
    'ui.router',
    'ui.bootstrap.transition',
    'ui.bootstrap.modal',
    'ui.bootstrap.dropdown',
    'bassmonger.resources'
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
                controller:'home',
                resolve:{
                    resources:['Standings', 'Tournaments', function(Standings, Tournaments){
                            return {Standings:Standings,Tournaments:Tournaments};
                        }
                    ]
                }
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
            .state('tournaments-results',{
                url:'/tournaments/:tournamentId/results',
                title:'Results',
                templateUrl:'/app/tournaments/results.html',
                controller:'tournaments.results',
                resolve:{
                    resources:['TournamentResults', function(TournamentResults){
                        return {TournamentResults:TournamentResults};
                    }
                    ]
                }
            });

    }])
    .run([function(){

    }]);

