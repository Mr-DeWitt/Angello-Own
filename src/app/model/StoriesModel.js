angular
    .module('Angello.Common')
    .service('StoriesModel', ['$http', 'EndpointConfigService', 'UtilsService', function ($http, EndpointConfigService, UtilsService) {
        var service = this,
            MODEL = '/stories/',
            statuses = [
                {name: 'To Do'},
                {name: 'In Progress'},
                {name: 'Code Review'},
                {name: 'QA Review'},
                {name: 'Verified'}
            ],
            types = [
                {name: 'Feature'},
                {name: 'Enhancement'}
            ];

        service.getStories = function () {
            return $http.get(EndpointConfigService.getUrlWithFormat(MODEL))
                .then(function (result) {
                    return UtilsService.objectToArray(result);
                });
        };

        service.update = function (storyId, story) {
            return $http.put(EndpointConfigService.getUrlForId(MODEL, storyId), story);
        };

        service.create = function (newStory) {
            return $http.post(EndpointConfigService.getUrlWithFormat(MODEL), newStory);
        };

        service.delete = function (storyId) {
            return $http.delete(EndpointConfigService.getUrlForId(MODEL, storyId));
        };

        service.getStatuses = function () {
            return statuses;
        };

        service.getTypes = function () {
            return types;
        }
    }]);