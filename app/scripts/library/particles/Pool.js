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

    var Pool = CoreObject.extend(null, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return Pool.assign(inherited, {
                        // _active: {
                        //     configurable: false,
                        //     enumerable: false,
                        //     value: []
                        // },
                        _pooled: {
                            configurable: false,
                            enumerable: false,
                            value: []
                        },
                        _totalSize: {
                            configurable: false,
                            enumerable: false,
                            value: 0
                        },
                        _Ctor: {
                            configurable: false,
                            enumerable: false,
                            value: CoreObject
                        }
                    });
                }
            },
            constructor: function Pool(instanceProps) {
                base.constructor.call(this, instanceProps);
                this.flood();
            },
            totalSize: {
                get: function() { return this._totalSize; },
                set: function(value) { this._totalSize = value; }
            },
            currentSize: {
                get: function() { return this._pooled.length; },
            },
            Ctor: {
                get: function() { return this._Ctor; },
                set: function(value) { this._Ctor = value; }
            },
            flood: function() {
                while (/*this._active.length + */this._pooled.length < this.totalSize) {
                    this._pooled.push(this.Ctor.create());
                }
            },
            flush: function() {
                // while (this._active.length) { this._active.pop(); }
                while (this._pooled.length) { this._pooled.pop(); }
            },
            at: function(index) {
                return this._pooled[index];
            },
            acquire: function() {
                return this._pooled.length
                    ? this._pooled.pop()
                    : null;
            },
            release: function(obj) {
                this._pooled.push(obj);
            }
        };
    });

    return Pool;

});

/* ================================================================================================================== */
