angular
    .module('Angello.Common')
    .service('UsersModel', function () {
        var service = this,
            users = [{
                id: 1,
                name: 'Lukas Ruebbelke'
            }, {
                id: 2,
                name: 'Brian Ford'
            }];

        service.getUsers = function () {
            return users;
        };


    });