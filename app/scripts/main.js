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
    console.log(app.can('toString'));
    console.log(app.has('_instanceId'));
    console.log(app.element);

    var Test = App.extend(null, {
        instanceDefaults: {
            get: function() {
                // TODO: eww ..?
                // var inherited = Object.getOwnPropertyDescriptor(CoreObject.prototype, 'instanceDefaults').get.call(this);
                var inherited = App.prototype.describe('instanceDefaults').get.call(this);
                // var inherited = App.describe('instanceDefaults').get.call(this);
                // var inherited = this.super.describe('instanceDefaults').get.call(this);
                return App.assign({
                // return this.super.constructor.assign({
                    _elementId: {
                        enumerable: false,
                        value: 'js-test'
                    },
                    _element: {
                        enumerable: false,
                        value: null
                    }
                }, inherited);
                // return {};
            }
        },
        constructor: function Test() {
            App.apply(this, arguments);
            // this.super.constructor.apply(this, arguments);
        }
    });
    var test = Test.create({_elementId: 'js-test'});
    console.log(test.elementId);
    console.log(test.toString(), test.instanceName);
    console.log(test.can('toString'));
    console.log(test.has('_instanceId'));
    console.log(test.element);

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
