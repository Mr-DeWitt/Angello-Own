angular.module('Angello.Common')
    .constant('CURRENT_BACKEND', 'firebase')
    .service('EndpointConfigService', function (CURRENT_BACKEND) {
        var service = this,
            endpointMap = {
                firebase: {URI: 'https://mrdewitt.firebaseio.com/', format: '.json'}
            },
            currentEndPoint = endpointMap[CURRENT_BACKEND];

        service.getUrl = function (model) {
            return currentEndPoint.URI + model;
        };

        service.getUrlWithFormat = function (model) {
            return currentEndPoint.URI + model + currentEndPoint.format;
        };

        service.getUrlForId = function (model, id) {
            return service.getUrl(model) + id + currentEndPoint.format;
        }
    });
