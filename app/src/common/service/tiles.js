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