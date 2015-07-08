angular.module('appStub', [
    'app',
    'ngMockE2E'
]).config(function($httpProvider){

    $httpProvider.interceptors.push('HttpStubInterceptor');

}).run(function(settings, $httpBackend, GetJsonFile){

    $httpBackend.whenGET(settings.endpoint + 'users').respond(GetJsonFile.synchronously('stub/GET-users.json'));

    $httpBackend.whenGET(settings.endpoint + 'users/1').respond(GetJsonFile.synchronously('stub/GET-user-01.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/2').respond(GetJsonFile.synchronously('stub/GET-user-02.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/3').respond(GetJsonFile.synchronously('stub/GET-user-03.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/4').respond(GetJsonFile.synchronously('stub/GET-user-04.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/5').respond(GetJsonFile.synchronously('stub/GET-user-05.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/6').respond(GetJsonFile.synchronously('stub/GET-user-06.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/7').respond(GetJsonFile.synchronously('stub/GET-user-07.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/8').respond(GetJsonFile.synchronously('stub/GET-user-08.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/9').respond(GetJsonFile.synchronously('stub/GET-user-09.json'));
    $httpBackend.whenGET(settings.endpoint + 'users/10').respond(GetJsonFile.synchronously('stub/GET-user-10.json'));

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
});

angular.module('appStub').service('HttpStubInterceptor', function($q, $timeout){
    var getMockedAsyncRespondTime = function (url) {
        switch (url.split(/\./).pop()) {
            case 'json':
                return 300;
            case 'html':
                // In production all views are into cachedUrl as JS Templates
                return 0;
            default:
                // Web Services
                return 1000;
        }
    };
    return {
        response: function (response) {
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(response);
            }, getMockedAsyncRespondTime(response.config.url.toString()));
            return defer.promise;
        }
    };
});

angular.module('appStub').service('GetJsonFile', function(){
    this.synchronously = function(url){
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        return request.response;
    };
});