angular.module('Angello.Dashboard')
    .controller('DashboardCtrl', function (StoriesModel, STORY_TYPES, STORY_STATUSES, $log) {
        var vm = this;
        vm.statuses = STORY_STATUSES;
        vm.types = STORY_TYPES;
        vm.stories = [];

        StoriesModel.getStories()
            .then(function (result) {
                $log.debug('RESULT: ', result);
                //var arr = [];
                //
                //for(var key in result){
                //    arr.push(result[key]);
                //}
                //vm.stories = arr;
                vm.stories = result;
            }, function (reason) {
                $log.debug('REASON: ', reason);
            });
    });
