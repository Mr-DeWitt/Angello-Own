angular.module('Angello.Common')
    .service('LoadingService', ['$rootScope', function ($rootScope) {
        var service = this;

        service.setLoading = function (isLoading) {
            $rootScope.loadingView = isLoading;
        };
    }]);
