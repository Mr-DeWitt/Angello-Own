angular.module('Angello.Storyboard')
    .directive('story', function () {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
        };
    });