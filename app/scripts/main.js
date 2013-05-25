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
    console.log(app.toString());
    console.log('CoreObject.numInstances', CoreObject.numInstances);
    console.log('App.numInstances', App.numInstances);
    console.log('app.instanceName', app.instanceName);
    console.log('app.instanceName', app.instanceName);

    var app1 = App.create();
    console.log(app1.toString());
    console.log('CoreObject.numInstances', CoreObject.numInstances);
    console.log('App.numInstances', App.numInstances);
    console.log('app1.instanceName', app1.instanceName);
    console.log('app1.instanceName', app1.instanceName);

    var Test = App.extend({
        constructor: function Test() {
        }
    });
    var test = Test.create();
    var test1 = Test.create();
    console.log(test.toString());
    console.log('CoreObject.numInstances', CoreObject.numInstances);
    console.log('App.numInstances', App.numInstances);
    console.log('Test.numInstances', Test.numInstances);
    console.log('test.instanceName', test.instanceName);
    console.log('test.instanceName', test.instanceName);
    console.log('test1.instanceName', test1.instanceName);

});

/* ================================================================================================================== */
