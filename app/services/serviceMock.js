(function () {
    'use strict';
    angular
        .module('app')
        .run(setupFakeBackend);
    function setupFakeBackend($httpBackend) {
        var testUser = { username: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin' };
        $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            var params = angular.fromJson(data);
            if (params.username === testUser.username && params.password === testUser.password) {
                return [200, { token: 'fake-jwt-token' }, {}];
            } else {
                return [200, {}, {}];
            }
        });
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();