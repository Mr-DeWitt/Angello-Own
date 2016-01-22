var myModule = angular.module('Angello', [
    'ngRoute',
    'Angello.Common',
    'Angello.Storyboard'
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