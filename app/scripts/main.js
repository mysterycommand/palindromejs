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
    'App'

], function (

    $,
    App

) {

    'use strict';
    if (window.$) { window.$.noConflict(); }
    if (window.jQuery) { window.jQuery.noConflict(); }
    // if (window._) { window._.noConflict(); }

    $(function() {
        var app = App.create();
        console.log(app.toString());

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
                constructor: function Test(instanceProps) {
                    base.constructor.call(this, instanceProps);
                }
            };
        });

        var test = Test.create();
        console.log(test.toString());

        var test1 = Test.create();
        console.log(test1.toString());
        // console.log(test1);
    });
});

/* ================================================================================================================== */
