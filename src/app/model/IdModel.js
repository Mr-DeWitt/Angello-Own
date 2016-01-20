angular
    .module('Angello.Common')
    .service('IdModel', function () {
        var service = this;
        var id = 1000;

        service.getId = function () {
            return id++;
        };
    });
