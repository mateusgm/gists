// ==UserScript==
// @name         Calculate ratio of lease / new price
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Calculate ratio of lease / new price
// @author       mateusgm
// @match        *://www.autoweek.nl/privateleasevergelijker/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    function toInt(e) {
      return parseInt( $(e).text().replace('.', '').replace('€ ', '') );
    }

    $(document).ready(function(){
        $('.xratio').remove();

        $('.carbase-prices').each(function(i,e) {
            var price   = toInt($('.carbase-price-value:first', e));
            var lease   = toInt($('.carbase-lease-price', e));
            var span    = $('<span />').css('color', 'red').addClass('xratio');
            var ratio   = 100*lease/price;
            $(e).append( span.text(ratio.toFixed(2)) );
        });
    });
})();