/** ====================================================================================================== **/
/**
 * @fileOverview
 * The main application entry point.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
    ],
    function(
    ) {
        'use strict';
        /* CoffeeScript's __extends: */
        // var __hasProp = {}.hasOwnProperty;
        // var __extends = function(child, parent) {
        //     for (var key in parent) {
        //         if (__hasProp.call(parent, key)) {
        //             child[key] = parent[key];
        //         }
        //     }

        //     function Ctor() {
        //         this.constructor = child;
        //     }
            
        //     Ctor.prototype = parent.prototype;
        //     child.prototype = new Ctor();
        //     child.__super__ = parent.prototype;

        //     return child;
        // };

        /* Backbone's extend: */
        // var backboneExtend = function(protoProps, staticProps) {
        //     var parent = this;
        //     var child;

        //     // The constructor function for the new subclass is either defined by you
        //     // (the "constructor" property in your `extend` definition), or defaulted
        //     // by us to simply call the parent's constructor.
        //     if (protoProps && _.has(protoProps, 'constructor')) {
        //         child = protoProps.constructor;
        //     } else {
        //         child = function(){ return parent.apply(this, arguments); };
        //     }

        //     // Add static properties to the constructor function, if supplied.
        //     _.extend(child, parent, staticProps);

        //     // Set the prototype chain to inherit from `parent`, without calling
        //     // `parent`'s constructor function.
        //     var Surrogate = function(){ this.constructor = child; };
        //     Surrogate.prototype = parent.prototype;
        //     child.prototype = new Surrogate();

        //     // Add prototype properties (instance properties) to the subclass,
        //     // if supplied.
        //     if (protoProps) { _.extend(child.prototype, protoProps); }

        //     // Set a convenience property in case the parent's prototype is needed
        //     // later.
        //     child.__super__ = parent.prototype;

        //     return child;
        // };

        /* Underscore's extend: */
        // var nativeForEach = Array.prototype.forEach;
        // var slice = Array.prototype.slice;
        // var breaker = {};
        // var each = function(obj, iterator, context) {
        //     if (obj == null) { return; }
        //     if (nativeForEach && obj.forEach === nativeForEach) {
        //         obj.forEach(iterator, context);
        //     } else if (obj.length === +obj.length) {
        //         for (var i = 0, l = obj.length; i < l; i++) {
        //             if (iterator.call(context, obj[i], i, obj) === breaker) { return; }
        //         }
        //     } else {
        //         for (var key in obj) {
        //             if (_.has(obj, key)) {
        //                 if (iterator.call(context, obj[key], key, obj) === breaker) { return; }
        //             }
        //         }
        //     }
        // };
        // var underscoreExtend = function(obj) {
        //     each(slice.call(arguments, 1), function(source) {
        //         if (source) {
        //             for (var prop in source) {
        //                 obj[prop] = source[prop];
        //             }
        //         }
        //     });
        //     return obj;
        // };

        /* Aped from https://github.com/jimmydo/js-toolbox/blob/master/toolbox.js, no 'ctor', no 'new': */
        var CoreObject = (function() {
            var _extend = function(parent, instanceProperties, classProperties) {
                var child;

                if (instanceProperties && instanceProperties.hasOwnProperty('constructor')) {
                    child = instanceProperties.constructor;
                } else {
                    child = function() { return parent.apply(this, arguments); };
                }

                // Do something to copy instance and class properties into child.
                // Possibly, munge them into a propertiesObject object.
                // Make _someMethod private?
                // Make setSomeProperty into a private _someProperty and public set someProperty?

                child.prototype = Object.create(parent.prototype);
                child.prototype.constructor = child;
                // child.__super__ = parent.prototype;

                return child;
            };

            var extend = function(instanceProperties, classProperties) {
                var child = _extend(this, instanceProperties, classProperties);
                child.extend = extend;
                return child;
            };

            function CoreObject() {}
            CoreObject.extend = extend;
            return CoreObject;
        })();

        return CoreObject;
    }
);