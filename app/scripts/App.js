/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    var App = CoreObject.extend({
        constructor: function App() {
        }
    });

    // var test1 = CoreObject.create();
    // var test2 = CoreObject.create();
    // var test3 = CoreObject.create();
    // var test4 = CoreObject.create();
    // var app = App.create();

    console.log('CoreObject.numInstances', CoreObject.numInstances);
    console.log('App.numInstances', App.numInstances);

    return App;

});

/* ================================================================================================================== */
