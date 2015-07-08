angular.module('app').controller('SidenavCtrl', function($scope, User){

    $scope.users = User.query();

});