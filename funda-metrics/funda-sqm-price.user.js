// ==UserScript==
// @name         Funda Price Metrics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  price/area
// @author       mateusgm
// @match        *://www.funda.nl/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$(function() {
    'use strict';

    var MAP_DELAY   = 1000;

    // auxiliar functions

    function _sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    var _extractInt = function(text) {
        var numeros = text.replace(',','.').match(/[.\d]+/);
        if(numeros === null) return null;
        return parseInt( numeros.join("").replace('.','') );
    };

    var _updateInfo = function(element, info) {
        var span   = $('<span/>').attr('style', 'color: red;').text("  |  " + info);
        var position = $('.search-result-content-inner', element);
        if(position.length === 0) position = element.closest('.search-result-content-inner');
        if(position.length === 0) position = element.parent();
        $('.search-result-info:first, .object-header__address-city', position).append(span);
    };


    // crawling

    var populatePrices = function() {
        $('.search-result-content, body').each(function(e, i) {
            var _this = $(this);
            var price = _extractInt( $('.search-result-price, .object-header__price', _this).text() );
            var meter = _extractInt( $('.object-kenmerken-group-list:first dd:first, .kenmerken-highlighted__list-item:nth-child(2) .kenmerken-highlighted__details font, .search-result-kenmerken font:first, a[title=Woonoppervlakte]', _this).text() );
            console.log("Found price:", price, " / meter:", meter);
            if( price === null || meter === null ) return;
            _updateInfo( _this, "€" + (price / meter / 1000).toPrecision(3) + "/m²");
        });
    };


    // binding our crawler to Funda pagination

    window.crawlResults = function() {
        console.log('Starting square meter crawler');
        populatePrices();
    };

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

    window.crawlResults();
});