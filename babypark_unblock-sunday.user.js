// @name         Unblock babypark zondag
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Unblock babypark zondag
// @author       mateusgm
// @match        *://www.babypark.nl/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var delay = 100;

    jQuery('script:contains(showSundayClose)').text('a+1').remove();
    jQuery('script:contains(price-box)').text('a+1').remove();

    jQuery(document).ready(function(){
        setTimeout(function() {
            jQuery('.price-box').show();
            jQuery('.category-minimal-price').show();
            jQuery('.product-image, .product-img-box').css('opacity','1.0');
            jquery('.overlay_modal_sunday, #modal_dialog_1532868760481').hide();
            console.log('hey');
        }, delay);
    });
})();