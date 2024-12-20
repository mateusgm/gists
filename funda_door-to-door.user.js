// ==UserScript==
// @name         Funda Metrics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  distance from Amsterdam
// @author       mateusgm
// @match        *://www.funda.nl/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var API_KEY     = '<API_KEY>';
    var DESTINATION = 'Stationsplein 11 L, 2011 LR Haarlem';
    var MODE        = 'WALKING'; //'TRANSIT';  // DRIVING WALKING BICYCLING
    var MAP_DELAY   = 1000;
    var VERBOSE     = false;

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
            if( status === 'OK' || retrial > 3 )
                return callback(response, status);

            _sleep(MAP_DELAY * Math.pow(2, retrial)).then(function() {
                if( VERBOSE )
                    console.log('- Retrying ', origin, ' after ', MAP_DELAY * Math.pow(2, retrial));
                _getDirection(origin, destination, mode, callback, retrial+1);
            });
        });
    };

    var _updateInfo = function(element, info) {
        var span   = $('<span/>').attr('style', 'color: red;').text("  |  " + info);
        $(element).append(span);
    };


    // crawling

    var populateDistances = function() {
        jQuery('*[data-test-id="street-name-house-number"]').each(function(i, e) {
            var _this = $(this);
            var from  = $.trim( _this.text() ).replace(/\s{2,}/g, ", ");

            _getDirection(from, DESTINATION, MODE, function(response, status) {
                if( response === null ) return;
                var point = response.routes[ 0 ].legs[ 0 ];
                if( VERBOSE )
                    console.log("Found distance:", from, point);
                _updateInfo( _this, point.distance.text );
                _updateInfo( _this, point.duration.text );
            });
        });
    };


    window.crawlResults = function() {
        console.log('Starting distance crawler');
        populateDistances();
    };


    // binding our crawler to Funda pagination

    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            history.onPushState({state: state});
            return pushState.apply(history, arguments);
        };
    })(window.history);

    window.history.onPushState = function() {
        _sleep(1000).then(window.crawlResults);
    };


    function loadLibrary(API_KEY, spec) {
        var map = document.createElement('script');
        map.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&callback=" + spec;
        document.getElementsByTagName('head')[0].appendChild(map);
    }

    loadLibrary(API_KEY, 'crawlResults');
})();
