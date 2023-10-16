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

$(function() {
    'use strict';

    var API_KEY     = 'API';
    var DESTINATION = 'ADDRESS';
    var MODE        = 'DRIVING'; //'TRANSIT DRIVING WALKING BICYCLING
    var MAP_DELAY   = 1000;
    var RETRIES     = 0;
    var MAX_ROUTES  = 100;
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
            if( status === 'OK' || retrial >= RETRIES )
                return callback(response, status);

            _sleep(Math.pow(2, retrial)).then(function() {
                if(VERBOSE)
                    console.log('- Retrying ', origin, ' after ', MAP_DELAY * Math.pow(2, retrial));
                _getDirection(origin, destination, mode, 1, callback, retrial+1);
            });
        });
    };

    var _updateInfo = function(position, info) {
        var span   = $('<span/>').attr('style', 'color: red;').text("  |  " + info);
        position.append(span);
    };


    // crawling

    var populateDistances = function() {
        var cache = {};
        $('[itemprop="address"]').each(function(i, e) {
            var _this = $(this);
            var from  = _this.attr('content');

            if( cache[from] !== undefined || i > MAX_ROUTES )
                return;
            cache[from] = true;

            _sleep(i * MAP_DELAY).then(function() {
                console.log("Querying " + from);
                _getDirection(from, DESTINATION, MODE, function(response, status) {
                    if( response === null ) return;
                    var point = response.routes[ 0 ].legs[ 0 ];
                    if(VERBOSE) console.log("Found distance:", point);
                    $('meta[content="'+from+'"]').each(function(i,e) {
                        _updateInfo( $(e).parent(), point.distance.text );
                        _updateInfo( $(e).parent(), point.duration.text );
                    });
                });
            });
        });
    };

    window.crawlResults = function() {
        if(VERBOSE) console.log('Starting distance crawler');
        if(API_KEY) populateDistances();
    };



    // loading scripts

    if(API_KEY) {
        var map = document.createElement('script');
        map.src = "https://maps.googleapis.com/maps/api/js?callback=crawlResults&key=" + API_KEY;
        document.getElementsByTagName('head')[0].appendChild(map);
    } else {
        window.crawlResults();
    }
});