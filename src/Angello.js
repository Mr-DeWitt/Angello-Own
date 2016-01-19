var myModule = angular.module('Angello', [
    'ngRoute',
    'Angello.Storyboard'
]);

myModule.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'src/storyboard/tmpl/storyboard.html',
        controller: 'StoryboardCtrl',
        controllerAs: 'storyboard'
    });
});