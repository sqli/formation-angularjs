angular.module('app').controller('UserCtrl',

    function(settings, $scope, User, $stateParams, $mdToast, $translate, Map, VideoTiles, $mdDialog){

        User.get({id: $stateParams.id}).$promise.then(function(user){
            $scope.user = user;
            $scope.map = Map.markerConfig(user.position.lat, user.position.lng);
            $scope.tiles = VideoTiles.buildGridModel(user.tiles);
        });

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

        $scope.showVideo = function(ev, scope){
            $mdDialog.show({
                controller: 'userVideoTileCtrl',
                templateUrl: 'src/common/directive/user-video-tile/view.html',
                parent: angular.element(document.body),
                scope: scope,
                targetEvent: ev,
            })
            .then(function() {

            });
        };

    }
);