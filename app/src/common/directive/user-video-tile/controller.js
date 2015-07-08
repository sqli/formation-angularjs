angular.module('app').controller('userVideoTileCtrl', function($scope, $mdDialog, $sce){

    $scope.close = function(){
        $mdDialog.hide();
    };

    $scope.transformUrl = function(url){
        return $sce.trustAsResourceUrl(url);
    };

});