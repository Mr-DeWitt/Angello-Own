angular
    .module('Angello.Storyboard')
    .controller('StoryboardCtrl', ['$scope', 'StoriesModel', 'UsersModel', '$log',
        function ($scope, StoriesModel, UsersModel, $log) {
            var vm = this;

            vm.statuses = StoriesModel.getStatuses();
            vm.types = StoriesModel.getTypes();
            vm.users = UsersModel.getUsers();

            vm.currentStory = null;
            vm.editedStory = {};

            function getStories() {
                StoriesModel.getStories()
                    .then(function (result) {
                        vm.stories = (result !== 'null') ? result : {};
                        $log.debug('RESULT: ', result);
                    }, function (reason) {
                        $log.debug('REASON: ', reason);
                    });
            }

            vm.createStory = function () {
                StoriesModel.create(vm.editedStory)
                    .then(function (result) {
                        getStories();
                        resetForm();
                        $log.debug('RESULT: ', result);
                    }, function (reason) {
                        $log.debug('REASON: ', reason);
                    });

                resetForm();
            };

            vm.selectStory = function (story) {
                vm.currentStory = story;
                vm.editedStory = angular.copy(vm.currentStory);
            };

            vm.cancelUpdate = function () {
                resetForm();
            };

            vm.updateStory = function () {
                var fields = ['title', 'description', 'criteria', 'status',
                    'type', 'reporter', 'assignee'];

                fields.forEach(function (field) {
                    vm.currentStory[field] = vm.editedStory[field];
                });

                StoriesModel.update(vm.editedStory.id, vm.editedStory)
                    .then(function (result) {
                        getStories();
                        resetForm();
                        console.log('RESULT: ' + result);
                    }, function (reason) {
                        console.log('REASON: ' + reason);
                    });
            };

            vm.changeStatus = function (story, status) {
                story.status = status.name;
            };

            vm.finalizeDrop = function (story) {
                $log.debug('ASD!!!!!!!!!!!!!!!!!!!!!!!!!!!', story);
                StoriesModel.update(story.id, story)
                    .then(function (result) {
                        console.log('RESULT: ' + result);
                    }, function (reason) {
                        console.log('REASON: ' + reason);
                    });
            };

            function resetForm() {
                vm.currentStory = null;
                vm.editedStory = {};       //TODO doesn't work if there is an invalid form value

                vm.detailsForm.$setPristine();
                vm.detailsForm.$setUntouched();
            }

            $scope.$on('storyDeleted', function () {
                getStories();
                resetForm();
            });

            getStories();
        }]);
