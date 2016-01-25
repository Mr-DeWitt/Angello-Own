head.js(
    {file: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js'},
    {file: '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular.js'},
    {file: '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.min.js'},
    {file: '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-route.min.js'},
    {file: '//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js'},
    {file: '/vendor/sugar.min.js'},
    {file: '/vendor/flot/jquery.flot.min.js'},
    {file: '/vendor/flot/jquery.flot.categories.min.js'},

    {file: '/src/app/App.js'},
    {file: '/src/app/service/EndpointConfigService.js'},
    {file: '/src/app/service/UtilsService.js'},
    {file: '/src/app/service/LoadingService.js'},
    {file: '/src/app/model/StoriesModel.js'},
    {file: '/src/app/model/UsersModel.js'},
    {file: '/src/app/animation/DetailsAnimation.js'},
    {file: '/src/app/animation/ListAreaAnimation.js'},

    {file: '/src/user/User.js'},
    {file: '/src/user/directives/UserStoryDirective.js'},

    {file: '/src/storyboard/Storyboard.js'},
    {file: '/src/storyboard/directives/story.js'},
    {file: '/src/storyboard/directives/DragAndDrop.js'},
    {file: '/src/storyboard/controller/StoryboardCtrl.js'},

    {apps: '/src/dashboard/Dashboard.js'},
    {apps: '/src/dashboard/controller/DashboardController.js'},
    {file: '/src/dashboard/directive/ChartDirective.js'},

    {file: '/src/Angello.js'}
).ready(
    function () {
        angular.bootstrap(document, ['Angello']);
    });
