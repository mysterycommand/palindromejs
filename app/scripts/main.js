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

    // app.element = document.getElementById('js-test');
    // console.log(app.element.cloneNode());
    // console.log(app.elementId);

    // app.elementId = 'js-three';
    // console.log(app.element.cloneNode());
    // console.log(app.elementId);

    // var app1 = App.create();
    // console.log(app1.toString(), app1.instanceName);

});

/* ================================================================================================================== */
