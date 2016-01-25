$LAB
    .script('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js')
    .script('//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular.js')
    .script('//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.min.js')
    .script('//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-route.min.js')
    .script('//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js')
    .script('/vendor/sugar.min.js')
    .script('/vendor/flot/jquery.flot.min.js')
    .script('/vendor/flot/jquery.flot.categories.min.js')

    .script('/src/app/App.js')
    .script('/src/app/service/EndpointConfigService.js')
    .script('/src/app/service/UtilsService.js')
    .script('/src/app/service/LoadingService.js')
    .script('/src/app/model/StoriesModel.js')
    .script('/src/app/model/UsersModel.js')
    .script('/src/app/animation/DetailsAnimation.js')
    .script('/src/app/animation/ListAreaAnimation.js')

    .script('/src/user/User.js')
    .script('/src/user/directives/UserStoryDirective.js')

    .script('/src/storyboard/Storyboard.js')
    .script('/src/storyboard/directives/story.js')
    .script('/src/storyboard/directives/DragAndDrop.js')
    .script('/src/storyboard/controller/StoryboardCtrl.js')

    .script('/src/dashboard/Dashboard.js')
    .script('/src/dashboard/controller/DashboardController.js')
    .script('/src/dashboard/directive/ChartDirective.js')

    .script('/src/Angello.js')

    .wait(function () {
        angular.bootstrap(document, ['Angello']);
    });

