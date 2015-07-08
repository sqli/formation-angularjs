angular.module('appStub', [
    'app',
    'ngMockE2E'
]).config(function(){

}).run(function(settings, $httpBackend, $resource){

    $httpBackend.whenGET(settings.endpoint + 'users').respond($resource('stub/GET-users.json').query());

    $httpBackend.whenGET(settings.endpoint + 'users/1').respond($resource('stub/GET-user-01.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/2').respond($resource('stub/GET-user-02.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/3').respond($resource('stub/GET-user-03.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/4').respond($resource('stub/GET-user-04.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/5').respond($resource('stub/GET-user-05.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/6').respond($resource('stub/GET-user-06.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/7').respond($resource('stub/GET-user-07.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/8').respond($resource('stub/GET-user-08.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/9').respond($resource('stub/GET-user-09.json').get());
    $httpBackend.whenGET(settings.endpoint + 'users/10').respond($resource('stub/GET-user-10.json').get());

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
});