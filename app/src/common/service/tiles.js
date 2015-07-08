angular.module('app').factory('VideoTiles', function(){

    var computeMinMaxMean = function(tiles) {
        var minMaxMin = {
            MIN : Number.MAX_VALUE,
            MAX : -Number.MAX_VALUE,
            MEAN: 0
        };

        for(var i = 0; i < tiles.length; i++){
            if(tiles[i].likes > minMaxMin.MAX){
                minMaxMin.MAX = tiles[i].likes;
            }
            if(tiles[i].likes < minMaxMin.MIN){
                minMaxMin.MIN = tiles[i].likes;
            }
            minMaxMin.MEAN = ((minMaxMin.MEAN * i) + tiles[i].likes) / (i+1);
        }
        return minMaxMin;
    }

    return {
        buildGridModel: function(tiles) {
            var minMaxMean = computeMinMaxMean(tiles);
            var results = [];
            tiles.forEach(function(post){

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
                }else if(post.likes >= minMaxMean.MEAN && post.likes < minMaxMean.MEAN + minMaxMean.MIN){
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