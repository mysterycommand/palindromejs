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
    // 'lodash',
    'library/CoreObject',
    'App'

], function (

    $,
    // _,
    CoreObject,
    App

) {

    'use strict';
    if (window.$) { window.$.noConflict(); }
    if (window.jQuery) { window.jQuery.noConflict(); }
    if (window._) { window._.noConflict(); }

    $(function() {
        var app = App.create();
        console.log(app.toString(), app.instanceName);
        console.log(app.element);

        var Test = App.extend(null, function(base) {
            return {
                instanceDefaults: {
                    get: function() {
                        var inherited = base.describe('instanceDefaults').get.call(this);
                        return Test.assign(inherited, {
                            _elementId: {
                                enumerable: false,
                                value: 'js-test'
                            },
                            _element: {
                                enumerable: false,
                                value: null
                            }
                        });
                    }
                },
                constructor: function Test() {
                    base.constructor.apply(this, arguments);
                }
            };
        });

        var test = Test.create();
        console.log(test.toString(), test.instanceName);
        console.log(test.element);
    });
});

/* ================================================================================================================== */
