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