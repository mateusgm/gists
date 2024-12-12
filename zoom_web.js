// ==UserScript==
// @name         zoom browser
// @namespace    http://tampermonkey.net/
// @version      2024-01-09
// @description  try to take over the world!
// @author       You
// @match        *.zoom.us/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zoom.us
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let jfyb = ("<h3 class=\"rm-presentation\"><span>Having issues with Zoom Client? <a web_client=\"\" tabindex=\"0\" role=\"button\">Join from Your Browser</a></span></h3>")
    let buttons, intervalBtn;
    let tries = 1;
    function tryGetButtons(){
        console.log('hey');
        if(++tries > 1000) clearInterval(intervalBtn)
        if(buttons == undefined) {
            buttons = document.getElementsByClassName("pUmU_FLW")[0]
        } else {
            clearInterval(intervalBtn)
            if(!buttons.innerHTML.includes(jfyb))
                buttons.innerHTML += jfyb
        }
    }
    intervalBtn = setInterval(tryGetButtons, 10);
})();