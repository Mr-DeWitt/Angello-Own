angular
    .module('Angello.Storyboard')
    .service('AngelloModel', function () {
        var service = this,
            stories = [{
                title: 'First story',
                description: 'Our first story.',
                criteria: 'Criteria pending.',
                status: 'To Do',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            }, {
                title: 'Second story',
                description: 'Do something.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            }, {
                title: 'Another story',
                description: 'Just one more.',
                criteria: 'Criteria pending.',
                status: 'Code Review',
                type: 'Enhancement',
                reporter: 'Lukas Ruebbelke',
                assignee: 'Brian Ford'
            }],
            statuses = [
                {name: 'To Do'},
                {name: 'In Progress'},
                {name: 'Code Review'},
                {name: 'QA Review'},
                {name: 'Verified'}
            ];

        service.getStories = function () {
            return stories;
        };

        service.getStatuses = function () {
            return statuses;
        };
    })
    .controller('StoryboardCtrl', function (AngelloModel) {
        var vm = this;

        vm.stories = AngelloModel.getStories();
        vm.statuses = AngelloModel.getStatuses();

        vm.numOfNewStories = 0;

        vm.createStory = function () {
            vm.stories.push({
                title: 'New Story' + (vm.numOfNewStories > 0 ? "(" + vm.numOfNewStories + ")" : ""),
                description: 'Description pending.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Pending',
                assignee: 'Pending'
            });
            ++vm.numOfNewStories;
        };
    });
