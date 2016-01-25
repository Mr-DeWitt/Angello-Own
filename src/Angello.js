var myModule = angular.module('Angello', [
    'ngAnimate',
    'ngRoute',
    'Angello.Common',
    'Angello.User',
    'Angello.Storyboard',
    'Angello.Dashboard'
]);

myModule
    .factory('loadingInterceptor', ['LoadingService', function (LoadingService) {
        return {
            request: function (config) {
                LoadingService.setLoading(true);
                return config;
            },
            response: function (response) {
                LoadingService.setLoading(false);
                return response;
            }
        };
    }])
    .config(['$routeProvider', '$httpProvider', '$provide', function ($routeProvider, $httpProvider, $provide) {
        $routeProvider.when('/', {
            templateUrl: 'src/storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            controllerAs: 'storyboard'
        }).when('/dashboard', {
            templateUrl: '/src/dashboard/tmpl/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
        });


        $httpProvider.interceptors.push('loadingInterceptor');

        $provide.decorator('$log', function ($delegate) {
            var debugFn = $delegate.debug;

            $delegate.debug = function () {
                arguments[0] = new Date() + " - " + arguments[0];
                debugFn.apply(null, arguments);
            };

            return $delegate;
        })
    }]);