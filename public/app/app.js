angular.module('bassmonger',[
    'ngResource',
    'ui.router',
    'ui.bootstrap.transition',
    'ui.bootstrap.modal',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.position',
    'ui.bootstrap.bindHtml',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.popover',
    'bassmonger.resources'
])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('');

        $stateProvider.state('tournaments-list',{
            url: '/tournaments',
            templateUrl:'/app/tournaments/list.html',
            controller:'tournaments.list',
            title:'Tournaments',
            resolve:{
                resources:['Tournaments',function(Tournaments){
                    return {Tournaments:Tournaments}
                }]
            }
        })
            .state('tournaments-edit',{
                url:'/tournaments/:tournamentId/edit',
                templateUrl:'/app/tournaments/edit.html',
                controller:'tournaments.edit',
                title:'Edit Tournament',
                resolve:{
                    resources:['Tournaments',function(Tournaments){
                        return {Tournaments:Tournaments};
                    }]
                }
            })
            .state('tournaments-bags',{
                url:'/tournaments/:tournamentId/bags',
                templateUrl:'/app/tournaments/bags.html',
                controller:'tournaments.bags',
                resolve:{
                    resources:[
                        'Tournaments', 'Bags', 'Teams', function(Tournaments, Bags, Teams){
                            return{Tournaments:Tournaments, Bags:Bags, Teams:Teams};
                        }
                    ]
                }
            })
            .state('home',{
                url:'?token&user',
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
            })

            .state('teams-list',{
                url:'/teams',
                templateUrl:'/app/teams/list.html',
                controller:'teams.list',
                resolve:{
                    resources:[
                        'Teams', function(Teams){
                            return {Teams:Teams};
                        }
                    ]
                }
            })
            .state('teams-create',{
                url:'/teams/create',
                templateUrl:'/app/teams/create.html',
                controller:'teams.create',
                resolve:{
                    resources:[
                        'Teams',function(Teams){
                            return {Teams:Teams};
                        }
                    ]
                }
            })
            .state('unauthorized',{
                    url:'/unauthorized',
                    title:'Unauthorized',
                    templateUrl:'/app/unauthorized/unauthorized.html',
                    controller:'unauthorized'
                }
            );

    }])
    .run(['$rootScope', '$location', '$injector', 'Teams','Tournaments', 'Users', function($rootScope, $location, $injector, Teams, Tournaments, Users){
        $rootScope.user = {};
        var authToken = $location.search().token;
        var userName = $location.search().user;
        if(authToken && userName){
            $rootScope.user = {email:userName,token:authToken};
            $rootScope.isLoggedIn = true;
            Users.get({token:authToken}).$promise.then(function(user){
                $rootScope.user.isAdmin = user.isAdmin;
            },function(error){
                console.log(error);
            });
            $injector.get("$http").defaults.transformRequest = function(data,headersGetter){
                if($rootScope.isLoggedIn){
                    headersGetter()['Authorization'] = $rootScope.user.token;
                }
                if(data){
                    return angular.toJson(data);
                }
            };
        }
        Teams.query().$promise.then(function(teams){
            $rootScope.teamList = teams;
        });
        Tournaments.query().$promise.then(function(tournaments){
            $rootScope.tournamentList = tournaments;
        });
        $location.search('token',null);
        $location.search('user',null);

    }]);

