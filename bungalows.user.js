// ==UserScript==
// @name         AutoTrack distance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  distance from house to dealer
// @author       mateusgm
// @match        *://www.autotrack.nl/aanbod*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         AutoTrack distance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  distance from house to dealer
// @author       mateusgm
// @match        ://www.bungalowspecials.nl/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

var Config = {
    api_key_ratings: 'API_KEY',
    api_key_maps: 'API_KEY',
    destination: 'ADDRESS',
    transport: 'DRIVING', //'TRANSIT DRIVING WALKING BICYCLING

    // settings
    verbose: true,
    max_routes: 100,
    retries: 0,
    map_delay: 200,
}


$(function() {
    'use strict';

    var WEBSITE = {
        search: '.bsPark_title_link',
        getter: function(_this) {
            return _this.text();
        },
    };

    // auxiliar functions

    function _sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    var _getDirection = function(origin, destination, mode, callback, retrial) {
        if(retrial === undefined) retrial = 0;
        var directionsService = new google.maps.DirectionsService();

        var request = {
            origin: origin, // LatLng|string
            destination: destination, // LatLng|string
            travelMode: google.maps.TravelMode[mode]
        };

        directionsService.route( request, function(response, status) {
            if( status === 'OK' || retrial >= Config.retries )
                return callback(response, status);

            _sleep(Math.pow(2, retrial)).then(function() {
                if(Config.verbose)
                    console.log('- Retrying ', origin, ' after ', Config.map_delay * Math.pow(2, retrial));
                _getDirection(origin, destination, mode, 1, callback, retrial+1);
            });
        });
    };

    var _getRating = function(needle, callback) {
        var request = {
            query: needle,
            fields: [ "name", "rating" ],
        }
        var placeService = new google.maps.places.PlacesService( $('<div/>').get(0) );
        placeService.findPlaceFromQuery(request, function(results, status) {
            if( status === 'OK')
                callback(results[0].rating);
        });
    }

    var _updateInfo = function(position, info) {
        var span   = $('<span/>').attr('style', 'color: red; font-size: medium;').html(info + "  |  ");
        position.append(span);
    };


    // crawling

    window.crawlDistances = function() {
        if(VERBOSE) console.log('Starting distance crawler');
        var cache = {};
        $(WEBSITE.search).each(function(i, e) {
            var _this = $(this);
            var from  = WEBSITE.getter(_this);

            if( cache[from] !== undefined || i > Config.max_routes )
                return;
            cache[from] = true;

            _sleep(i * Config.map_delay).then(function() {
                console.log("Querying " + from);
                _getDirection(from, Config.destination, Config.transport, function(response, status) {
                    if( response === null ) return;
                    var point = response.routes[ 0 ].legs[ 0 ];
                    if(VERBOSE) console.log("Found distance:", point);
                    _updateInfo( _this.parent(), point.distance.text );
                    _updateInfo( _this.parent(), point.duration.text.replace(' hours', 'h').replace(' mins', 'm') );
                });
            });
        });
    };


    window.crawlRatings = function() {
        if(VERBOSE) console.log('Starting rating crawler');

        $(WEBSITE.search).each(function(i, e) {
            var _this = $(this);
            var place = WEBSITE.getter(_this);

            _sleep(i * Config.map_delay).then(function() {
                _getRating(place, function(rating) {
                    if(VERBOSE) console.log("Found rating:", rating);
                    _updateInfo( _this.parent(), '</br>' );
                    _updateInfo( _this.parent(), rating );
                });
            });
        });
    }

    // loading scripts

    function loadLibrary(API_KEY, spec) {
        var map = document.createElement('script');
        map.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&callback=" + spec;
        document.getElementsByTagName('head')[0].appendChild(map);
    }


    loadLibrary(Config.api_key_maps, 'crawlDistances');
    loadLibrary(Config.api_key_ratings, 'crawlRatings&libraries=places');

});
