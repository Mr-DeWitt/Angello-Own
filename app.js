(function () {
    var app = angular.module('Angello', []);

    app.controller('MainCtrl', function (AngelloModel) {
        var main = this;

        main.stories = AngelloModel.getStories();

        main.numOfNewStories = 0;

        main.createStory = function () {
            main.stories.push({
                title: 'New Story' + (main.numOfNewStories > 0 ? "(" + main.numOfNewStories + ")" : ""),
                description: 'Description pending.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 'Pending',
                assignee: 'Pending'
            });
            ++main.numOfNewStories;
        };
    });

    app.service('AngelloModel', function () {
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
            }];

        service.getStories = function () {
            return stories;
        };
    });

    app.directive('story', function () {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
        };
    });
})();
