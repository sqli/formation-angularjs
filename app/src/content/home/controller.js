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