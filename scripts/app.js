angular.module('app', [
    'ngResource',
    'pascalprecht.translate',
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'leaflet-directive'
]).config(function($translateProvider, $stateProvider, $urlRouterProvider){

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'i18n/{lang}/{part}.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.cloakClassName('hidden');
    $translateProvider.useSanitizeValueStrategy(null);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            abstract: true,
            url: "",
            templateUrl: "src/main.html"
        })
        .state('home', {
            parent: 'main',
            url: "/",
            views: {
                sidenav: {
                    templateUrl: "src/sidenav/view.html",
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: "src/content/home/view.html",
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('user', {
            parent: 'home',
            url: "user/:id",
            views: {
                'content@main': {
                    templateUrl: "src/content/user/view.html",
                    controller: 'UserCtrl'
                }
            }
        });

}).run(function($translatePartialLoader, $translate, $rootScope, $mdSidenav){

    $translatePartialLoader.addPart('common');
    $translatePartialLoader.addPart('sidenav');
    $translatePartialLoader.addPart('home');
    $translatePartialLoader.addPart('user');

    setTimeout(function(){
        $translate.refresh();
    },1);

    $rootScope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

});
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
angular.module('app').constant('settings', {
    endpoint: 'http://www.monbackend.com/rest-api/',
    toast: {
        position: 'bottom right',
        hideDelay: 3000
    }
});
angular.module('app').controller('SidenavCtrl', function($scope, User){

    $scope.users = User.query();

});
angular.module('app').factory('User', function(settings, $resource){
   return $resource(settings.endpoint + 'users/:id');
});
angular.module('app').factory('Map', function(){

    return {
        markerConfig: function(lat, lng){
            return {
                markers: [{
                    lat: lat,
                    lng: lng
                }],
                center: {
                    lat: lat,
                    lng: lng,
                    zoom: 12
                }
            }
        }
    };

});
angular.module('app').factory('VideoTiles', function(){

    var computeMinMaxMean = function(posts) {
        var minMaxMin = {
            MIN : Number.MAX_VALUE,
            MAX : -Number.MAX_VALUE,
            MEAN: 0
        };

        for(var i = 0; i < posts.length; i++){
            if(posts[i].likes > minMaxMin.MAX){
                minMaxMin.MAX = posts[i].likes;
            }
            if(posts[i].likes < minMaxMin.MIN){
                minMaxMin.MIN = posts[i].likes;
            }
            minMaxMin.MEAN = ((minMaxMin.MEAN * i) + posts[i].likes) / (i+1);
        }
        return minMaxMin;
    }

    return {
        buildGridModel: function(posts) {
            var minMaxMean = computeMinMaxMean(posts);
            var results = [];
            posts.forEach(function(post){

                var sizes = [{
                    row: 1,
                    col: 1
                }, {
                    row: 1,
                    col: 2
                }, {
                    row: 2,
                    col: 2
                }];

                var size = sizes[0];
                if(post.likes < minMaxMean.MEAN){
                    size = sizes[0];
                }else if(post.likes >= minMaxMean.MEAN && post.likes < (post.likes + (minMaxMean.MAX - minMaxMean.MIN) / 3)){
                    size = sizes[1];
                }else{
                    size = sizes[2];
                }

                results.push(angular.extend({size: size}, post));
            });
            return results;
        }
    };

});
angular.module('app').filter('performance', function(){
    return function(input){
        if(input > 0){
            return 'trending_up';
        } else if(input < 0){
            return 'trending_down';
        } else {
            return 'trending_neutral';
        }
    }
});
angular.module('app').directive('userCardLight', function($stateParams){
    return {
        restrict: 'A',
        replace: false,
        scope: {
            user: '=userCardLight'
        },
        templateUrl: 'src/common/directive/user-card-light/view.html',
        link: function(scope){
            scope.computeIcon = function(userId){
                return $stateParams.id == userId ? 'check': 'pageview';
            };
        }
    }
});
angular.module('app').controller('HomeCtrl', function($scope, $interval){

    var duration = 2000;

    var iconList = [{
        icon: 'twitter',
        color: '#1AB2E8'
    },{
        icon: 'whatsapp',
        color: '#49C759'
    },{
        icon: 'windows',
        color: '#208CD7'
    },{
        icon: 'google-plus',
        color: '#DA4835'
    },{
        icon: 'amazon',
        color: '#FBA914'
    },{
        icon: 'apple',
        color: '#A6B1B7'
    },{
        icon: 'office',
        color: '#74A443'
    },{
        icon: 'facebook',
        color: '#3B5998'
    },{
        icon: 'github-box',
        color: '#323131'
    },{
        icon: 'linkedin',
        color: '#0177B5'
    }];

    var i = 0;
    $scope.selectedIcon = iconList[i];
    $interval(function(){
        $scope.selectedIcon = iconList[i % 10];
        i++;
    }, duration);

    $scope.option = {
        rotation: 'none',
        duration: duration,
        easing : 'sine-out'
    };

});
angular.module('app').controller('UserCtrl', function(settings, $scope, User, $stateParams, $mdToast, $translate, Map, VideoTiles, $sce){

    User.get({id: $stateParams.id}).$promise.then(function(user){
        $scope.user = user;
        $scope.map = Map.markerConfig(user.position.lat, user.position.lng);
        $scope.tiles = VideoTiles.buildGridModel(user.posts);
    });

    $scope.transformUrl = function(url){
        return $sce.trustAsResourceUrl(url);
    };

    $scope.action1 = function(){
        $mdToast.show(
            $mdToast.simple()
                .content($translate.instant('user.action1.toast.text'))
                .position(settings.toast.position)
                .hideDelay(settings.toast.hideDelay)
        );
    };

    $scope.delete = function(user) {
        var toast = $mdToast.simple()
            .content($translate.instant('user.delete.toast.text', {name: user.name}))
            .action($translate.instant('user.delete.toast.text.action'))
            .highlightAction(true)
            .position(settings.toast.position);
        $mdToast.show(toast).then(function() {
            $mdToast.show(
                $mdToast.simple()
                    .content($translate.instant('user.delete.toast.text.cancel.confirmation', {name: user.name}))
                    .position(settings.toast.position)
                    .hideDelay(settings.toast.hideDelay)
            );
        });
    };

});