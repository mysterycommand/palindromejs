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

    var Test = App.extend(null, {
        instanceDefaults: {
            get: function() {
                console.log('Test.super', this.super());
                // // TODO: eww ...
                var inherited = App.prototype.describe('instanceDefaults').get.call(this);
                // var inherited = this.super.instanceDefaults;
                return {}; // App.assign(inherited, {
                //     _elementId: {
                //         enumerable: false,
                //         value: 'js-test'
                //     },
                //     _element: {
                //         enumerable: false,
                //         value: null
                //     }
                // });
            }
        },
        constructor: function Test() {
            App.apply(this, arguments);
        }
    });
    var test = Test.create();
    console.log(test.toString(), test.instanceName);
    console.log(test.element);

});

/* ================================================================================================================== */
