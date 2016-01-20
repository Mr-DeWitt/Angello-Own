angular
    .module('Angello.Storyboard')
    .controller('StoryboardCtrl', function (StoriesModel, UsersModel, IdModel) {
        var vm = this;

        vm.stories = StoriesModel.getStories();
        vm.statuses = StoriesModel.getStatuses();
        vm.types = StoriesModel.getTypes();
        vm.users = UsersModel.getUsers();

        vm.currentStory = null;
        vm.editedStory = {};

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

            resetForm();
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
    });
