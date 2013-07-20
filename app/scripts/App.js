/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true */

define([

    'library/core/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    var App = CoreObject.extend({
        VERSION: {
            configurable: false,
            value: '0.0.1',
            writable: false
        }
    }, function(base) {
        return {
            constructor: function App(instanceProps) {
                base.constructor.call(this, instanceProps);
            }
        };
    });

    return App;

});

/* ================================================================================================================== */
