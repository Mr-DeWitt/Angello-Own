angular.module('Angello.User')
    .directive('userStory', ['StoriesModel', '$rootScope', '$log',
        function (StoriesModel, $rootScope, $log) {
            var linker = function (scope, element, attrs) {
            };

            var controller = function () {
                var vm = this;

                vm.deleteStory = function (story) {
                    StoriesModel.delete(story.id)
                        .then(function (result) {
                            $rootScope.$broadcast('storyDeleted');
                            $log.debug('RESULT: ', result);
                        }, function (reason) {
                            $log.debug('REASON: ', reason);
                        });
                }
            };

            return {
                restrict: 'A',
                link: linker,
                controller: controller,
                controllerAs: 'userStoryDirectiveCtrl'
            };
        }]);
