/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/core/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    var Command = CoreObject.extend(null, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return Command.assign(inherited, {
                        _fn: {
                            configurable: false,
                            enumerable: false,
                            value: function() {}
                        },
                        _target: {
                            configurable: false,
                            enumerable: false,
                            value: null
                        }
                    });
                }
            },
            constructor: function Command(instanceProps) {
                base.constructor.call(this, instanceProps);
            },
            fn: {
                get: function() { return this._fn; },
                set: function(value) { this._fn = value; }
            },
            target: {
                get: function() { return this._target; },
                set: function(value) { this._target = value; }
            },
            execute: function() { this.fn(); }
        };
    });

    return Command;

});

/* ================================================================================================================== */
