/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint newcap: false */

define([

    'library/util/descriptors/assignDescriptors',
    'library/util/extend',
    'library/util/slice',
    'library/util/unique'

], function (

    assignDescriptors,
    extend,
    slice,
    unique

) {

    'use strict';

    var CoreObject = extend(Object, {
        // 'public static' members
        extend: function(staticProps, protoProps) {
            return extend(this, staticProps, protoProps);
        },
        create: function(instanceProps) {
            return new this(instanceProps);
        },
        assign: assignDescriptors
        // 'private static' members
    }, {
        // 'public' accessor members
        instanceDefaults: {
            get: function() {
                var ctor = this.constructor.name;
                var name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1);
                var uniqueId = unique(ctor);
                return {
                    _instanceId: {
                        configurable: false,
                        enumerable: false,
                        value: uniqueId,
                        writable: false
                    },
                    _instanceName: {
                        configurable: false,
                        enumerable: false,
                        value: name + uniqueId,
                        writable: false
                    }
                };
            }
        },
        constructor: function CoreObject(instanceProps) {
            // console.log(this.constructorName + '#constructor', arguments);
            this.define(this.instanceDefaults, instanceProps || {});
        },
        // 'public' members
        can: function(key) {
            return typeof this[key] === 'function';
        },
        has: function(key) {
            return this.hasOwnProperty(key);
        },
        describe: function(key) {
            return Object.getOwnPropertyDescriptor(this, key);
        },
        define: function() {
            var definition = CoreObject.assign.apply(this, slice.call(arguments));
            return Object.defineProperties(this, definition);
        },
        toString: function() {
            return '[' + (typeof this) + ' ' + this.constructor.name + ']';
        },
        instanceId: {
            configurable: false,
            get: function() {
                return this._instanceId;
            }
        },
        instanceName: {
            configurable: false,
            get: function() {
                return this._instanceName;
            }
        }
        // 'private' members
    });

    return CoreObject;

});

/* ================================================================================================================== */
