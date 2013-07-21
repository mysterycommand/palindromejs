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

    var Vec2 = CoreObject.extend(null, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return Vec2.assign(inherited, {
                        _x: {
                            configurable: false,
                            enumerable: false,
                            value: 0
                        },
                        _y: {
                            configurable: false,
                            enumerable: false,
                            value: 0
                        }
                    });
                }
            },
            constructor: function Vec2(instanceProps) {
                base.constructor.call(this, instanceProps);
            },
            x: {
                get: function() { return this._x; },
                set: function(value) { this._x = value; }
            },
            y: {
                get: function() { return this._y; },
                set: function(value) { this._y = value; }
            },
            plusEq: function(vec) {
                this.x += vec.x;
                this.y += vec.y;
            },
            minusEq: function(vec) {
                this.x -= vec.x;
                this.y -= vec.y;
            },
            toString: function() {
                return base.toString.call(this) + ' (' + this.x + ', ' + this.y + ')';
            }
        };
    });

    return Vec2;

});

/* ================================================================================================================== */
