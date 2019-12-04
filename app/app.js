var app = angular
    .module('app',
    ['ui.router'])
    .config(config);
    //.run(run);

function config($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('.login', {
            url: '/login',
            templateUrl: 'app/modules/principal/login.html',
            controller: 'principalController',
            controllerAs: 'vm'
        })
}