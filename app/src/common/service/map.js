angular.module('app').factory('Map', function(){

    return {
        markerConfig: function(lat, lng){
            return {
                markers: [{
                    lat: lat,
                    lng: lng
                }],
                center: {
                    lat: lat,
                    lng: lng,
                    zoom: 12
                }
            }
        }
    };

});