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