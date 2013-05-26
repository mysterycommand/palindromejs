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
                    instanceId: {
                        configurable: false,
                        value: uniqueId,
                        writable: false
                    },
                    instanceName: {
                        configurable: false,
                        value: name + uniqueId,
                        writable: false
                    }
                };
            }
        },
        constructor: function CoreObject(instanceProps) {
            // console.log(this.constructorName + '#constructor', arguments);
            instanceProps = assignDescriptors(this.instanceDefaults, instanceProps || {});
            this.def(instanceProps);
        },
        can: function(key) {
            return typeof this[key] === 'function';
        },
        has: function(key) {
            return this.hasOwnProperty(key);
        },
        def: function(instanceProps) {
            return Object.defineProperties(this, instanceProps);
        },
        // 'public' members
        toString: function() {
            return '[' + (typeof this) + ' ' + this.constructor.name + ']';
        }
        // 'private' members
    });

    return CoreObject;

});

/* ================================================================================================================== */
