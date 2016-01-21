angular
    .module('Angello.Storyboard')
    .controller('StoryboardCtrl', function (StoriesModel, UsersModel, IdModel, $log) {
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
                    $log.debug('RESULT: ' + result);
                }, function (reason) {
                    $log.debug('REASON: ' + reason);
                });
        }

        vm.createStory = function () {
            var newStory = angular.copy(vm.editedStory);
            newStory.id = IdModel.getId();
            vm.stories.push(newStory);

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

        vm.deleteStory = function (storyToDelete) {
            vm.stories.remove(function (story) {
                return story === storyToDelete;
            });

            resetForm();
        };

        function resetForm() {
            vm.currentStory = null;
            vm.editedStory = {};       //TODO doesn't work if there is an invalid form value

            vm.detailsForm.$setPristine();
            vm.detailsForm.$setUntouched();
        }

        getStories();
    });
