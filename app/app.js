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