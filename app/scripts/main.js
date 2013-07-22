/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/* ================================================================================================================== */

require([

    'jquery',
    'App',

    'library/util/polyfill/requestAnimationFrame'

], function (

    $,
    App

) {

    'use strict';
    if (window.$) { window.$.noConflict(true); }
    if (window._) { window._.noConflict(); }

    $(function() {
        var app = App.create();
        console.log(app.toString());
    });
});

/* ================================================================================================================== */
