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
    'lodash',
    'library/CoreObject',
    'App'

], function (

    $,
    _,
    CoreObject,
    App

) {

    'use strict';

    var app = App.create();
    console.log(app.toString(), app.instanceName);
    console.log(app.element);

});

/* ================================================================================================================== */
