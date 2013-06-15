/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true, newcap: false */

define([

    'library/util/descriptors/assignDescriptors',
    'library/util/descriptors/getDescriptors',
    'library/util/extend',
    'library/util/slice',
    'library/util/unique'

], function (

    assignDescriptors,
    getDescriptors,
    extend,
    slice,
    unique

) {

    'use strict';

    var CoreObject = extend(Object, {
        // 'public static' members
        extend: function(staticProps, protoFn) {
            return extend(this, staticProps, protoFn);
        },
        create: function(instanceProps) {
            return new this(instanceProps);
        },
        assign: assignDescriptors
        // 'private static' members
    }, function(/* base */) {
        return {
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
                return ( !! key)
                    ? Object.getOwnPropertyDescriptor(this, key)
                    : getDescriptors(this);
            },
            define: function() {
                var descriptors = assignDescriptors.apply(null, slice.call(arguments));
                return Object.defineProperties(this, descriptors);
            },
            toString: function() {
                return '[' + this.instanceName + ' ' + this.constructor.name + ']';
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
        };
    });

    return CoreObject;

});

/* ================================================================================================================== */
