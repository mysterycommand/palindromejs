/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 *
 * @copyright Copyright (c) 2013, Matt Hayes, (occasionally) dba Mystery Command
 * All rights reserved.
 *
 * @license <a href="http://en.wikipedia.org/wiki/BSD_licenses">FreeBSD License</a> Redistribution and use in source
 * and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the
 *    following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
 *    following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY MYSTERY COMMAND AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL MYSTERY COMMAND OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
 * USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true, newcap: false */

define([

    'library/core/extend',
    'library/util/descriptors/assignDescriptors',
    'library/util/descriptors/getDescriptors',
    'library/util/unique'

], function (

    extend,
    assignDescriptors,
    getDescriptors,
    unique

) {

    'use strict';

    /**
     * CoreObject is the main "Class" object. It sets up inheritance, and adds some convenient introspection
     * functions.
     */
    var CoreObject = extend(Object, {

        // I like to put 'public static' members all the way at the top.

        /**
         * Proxies to the assignDescriptors method for convenience, particularly when inheriting values from a
         * base class's getter.
         *
         * @see     documentation in '/library/util/descriptors/assignDescriptors' for more.
         */
        assign: assignDescriptors,

        /**
         * Use CoreObject.create([instanceProps]) to generate instances. Currently it just proxies to new, but
         * might add functionality latyer. If instanceProps is passed, it's members will be copied onto the new
         * instance.
         *
         * @param  {Object} instanceProps An object who's properties will be copied onto the new instance.
         * @return {Object}               A new instance of the constructor from which create was called.
         */
        create: function(instanceProps) {
            return new this(instanceProps);
        },

        /**
         * Use CoreObject.extend([staticProps], [protoFn]) to create new "subclasses" (that is, constructors
         * with the appropriate prototype chain set up). Proxies out to `/library/core/extend`, but passes
         * the current constructor as the first argument.
         *
         * @param  {Object}     staticProps     An object who's properties will be copied onto the new
         *                                      constructor.
         * @param  {Funciton}   protoFn         A function that will be passed a reference to this constructor's
         *                                      prototype for use as a kind-of "super".
         * @return {[type]}             [description]
         */
        extend: function(staticProps, protoFn) {
            return extend(this, staticProps, protoFn);
        },

        // I like to put 'private static' members after 'public static' members, but I'm not super clear
        // on what 'private static' even means in JavaScript ... maybe just non-configurable and non-enumerable
        // like with 'private' prototype methods.

    }, function(base) {
        return {

            // I like to put 'public' accessor members before the constructor.

            instanceDefaults: {
                get: function() {
                    var ctor = this.constructor.name;
                    var name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1);
                    var id = unique(ctor);
                    return {
                        _instanceId: {
                            configurable: false,
                            enumerable: false,
                            value: id,
                            writable: false
                        },
                        _instanceName: {
                            configurable: false,
                            enumerable: false,
                            value: name + id,
                            writable: false
                        }
                    };
                }
            },

            /**
             * Creates a new instance of CoreObject. By default, anything returned from instanceDefaults will be
             * assigned to this. In objects that extend from CoreObject passing an object to instanceProps will
             * create members on the instance, but in the particular case of CoreObject _instanceId and _instanceName
             * are non-configurable, and non-writable, so trying to override them will throw an error. They are used
             * for introspection (currently they just make instance.toString more meaningful).
             *
             * @param {Object} instanceProps An object who's properties will be copied onto the new instance.
             */
            constructor: function CoreObject(instanceProps) {
                var inst = {};
                var sets = {};
                var desc;

                // This is probably not a great way to do this, but it will work for now:
                // 1. Iterate over the 'instanceProps' passed in.
                // 2. If a setter exists for that property name, store the value in the 'sets' hash.
                // 3. Otherwise, put the value in the 'inst' hash.
                Object.keys(instanceProps || {}).forEach(function(key) {
                    desc = this.describe(key);
                    if (desc && desc.set) {
                        sets[key] = instanceProps[key];
                    } else {
                        inst[key] = instanceProps[key];
                    }
                }.bind(this));

                // 4. Combine the 'inst' hash with 'instanceDefaults' and define them on the new instance.
                this.define(this.instanceDefaults, inst);

                // 5. Set the 'sets' hash on the new instance.
                Object.keys(sets).forEach(function(key) {
                    this[key] = sets[key];
                }.bind(this));
            },

            // I like to declare 'public' data members after the constructor.

            /**
             * Use can for duck-typing your instances. Checks if 'key' is a function in the instance's prototype chain.
             *
             * @param  {String} key     The method name to look for.
             * @return {Boolean}        True if the property exists and is a function, false otherwise.
             */
            can: function(key) {
                return typeof this[key] === 'function';
            },

            /**
             * Use has for duck-typing your instances. Checks if 'key' is an own property of this instance. Also, I just
             * want to point out what an exercise in restraint it is for me not to name this method 'haz', and then chain
             * it (along with can) and add another method 'cheezburger' so that `CoreObject.can.haz.cheezburger === true`.
             * Just sayin'.
             *
             * @param  {String} key     The property name to look for.
             * @return {Boolean}        True if the propery is an own property of this instance.
             */
            has: function(key) {
                return this.hasOwnProperty(key);
            },

            /**
             * Use describe to get propery descriptors. The function will look in 'this' first, and then "crawl" up
             * the prototype chain until it finds the property with the name passed in key. The function will return
             * null if no property with the passed in name can be fount. Calling describe without arguments will
             * return an object with all property descriptors for this instance.
             *
             * @param  {String} key The property name to describe, or undefined (in which case all own properties
             *                      will be described and returned);
             * @return {Object}     A property descriptor object.
             *
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
             */
            describe: function(key) {
                if (!! key) {
                    var obj = this;
                    while (!! obj && ! obj.hasOwnProperty(key)) {
                        obj = Object.getPrototypeOf(obj);
                    }

                    return (!! obj)
                        ? Object.getOwnPropertyDescriptor(obj, key)
                        : null;
                }
                return getDescriptors(this);
            },

            /**
             * Use define to define properties (via [provided or generated] property descriptor object) to instances.
             *
             * @param  {...}     arguments  One or more objects to be converted to property descriptors and then
             *                              defined on this instance.
             * @return {Object}             The object with it's new properties defined.
             */
            define: function() {
                if ( ! arguments.length) { return this; }
                var descriptors = assignDescriptors.apply(null, arguments);
                return Object.defineProperties(this, descriptors);
            },

            /**
             * Overrides the native Object.toString to give a more useful string representation of instances.
             *
             * @return {String} A string in the form of "[instanceName ConstructorName]".
             */
            toString: function() {
                return '[' + this.instanceName + ' ' + this.constructor.name + ']';
            },

            /**
             * A public accessor for the automatically generated instance id.
             *
             * @return {String}     A unique id for the instance (generated during construction).
             */
            instanceId: {
                configurable: false,
                get: function() {
                    return this._instanceId;
                }
            },

            /**
             * A public accessor for the automatically generated instance name.
             *
             * @return  {String}    A unique name for the instance (generated during construction).
             */
            instanceName: {
                configurable: false,
                get: function() {
                    return this._instanceName;
                }
            }

            // I like to put 'private' members at the bottom ... they're not really meant to be consumed, and anyway
            // in JavaScript 'private' essentially means non-configurable and non-enumerable ... you can still get
            // at them if you know their names.
        };
    });

    return CoreObject;

});

/* ================================================================================================================== */
