angular.module('app').directive('userVideoTile', function($mdDialog){
    return {
        restrict: 'A',
        templateUrl: 'src/common/directive/user-video-tile/view.html',
        replace: true,
        scope: {
            tile: '=userVideoTile'
        },
        link: function(scope){
            scope.showVideo = function(ev, $scope){
                $mdDialog.show({
                    controller: 'UserVideoTileCtrl',
                    templateUrl: 'src/common/directive/user-video-tile/dialog.html',
                    parent: angular.element(document.body),
                    scope: $scope,
                    targetEvent: ev
                })
                .then(function() {

                });
            };
        }
    };
});