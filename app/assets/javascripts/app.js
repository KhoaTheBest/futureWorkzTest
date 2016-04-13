'use strict';
var mainModule = angular.module('futureWorkz', [
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'templates'
]);

// mainModule.config(function($httpProvider) {
//     $httpProvider.interceptors.push('sessionInterceptorFactory');
// });

mainModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/app', {
                url: '/app',
                templateUrl: 'partials/app.html'
            });

        $urlRouterProvider.otherwise('/app');
    }
]);
