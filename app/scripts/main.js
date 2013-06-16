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
    'library/core/CoreObject',
    'App'

], function (

    $,
    CoreObject,
    App

) {

    'use strict';
    if (window.$) { window.$.noConflict(); }
    if (window.jQuery) { window.jQuery.noConflict(); }
    // if (window._) { window._.noConflict(); }

    $(function() {
        var app = App.create();
        // console.log(app.toString());
    });
});

/* ================================================================================================================== */
