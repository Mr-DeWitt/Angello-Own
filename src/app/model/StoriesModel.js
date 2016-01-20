angular
    .module('Angello.Common')
    .service('StoriesModel', function () {
        var service = this,
            stories = [{
                id: 1,
                title: 'First story',
                description: 'Our first story.',
                criteria: 'Criteria pending.',
                status: 'To Do',
                type: 'Feature',
                reporter: 1,
                assignee: 2
            }, {
                id: 2,
                title: 'Second story',
                description: 'Do something.',
                criteria: 'Criteria pending.',
                status: 'Back Log',
                type: 'Feature',
                reporter: 1,
                assignee: 2
            }, {
                id: 3,
                title: 'Another story',
                description: 'Just one more.',
                criteria: 'Criteria pending.',
                status: 'Code Review',
                type: 'Enhancement',
                reporter: 1,
                assignee: 2
            }],
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
            return stories;
        };

        service.getStatuses = function () {
            return statuses;
        };

        service.getTypes = function () {
            return types;
        }
    });