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

        var _extend = function(parent, instanceProps, classProps) {
            var child;

            if (instanceProps && instanceProps.hasOwnProperty('constructor')) {
                child = instanceProps.constructor;
            } else {
                child = function() { return parent.apply(this, arguments); };
            }

            // Do something to copy instance and class properties into child.
            // Possibly, munge them into a propertiesObject object.
            // Make _someMethod private?
            // Make setSomeProperty into a private _someProperty and public set someProperty?

            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
            child.proto = parent.prototype;

            var prop;

            // own properies of the parent get copied to the new class
            for (prop in parent) {
                if (parent.hasOwnProperty(prop)) {
                    child[prop] = parent[prop];
                }
            }

            // instance properties get copied to the new prototype
            if ( !! instanceProps) {
                for (prop in instanceProps) {
                    child.prototype[prop] = instanceProps[prop];
                }
            }

            // class properties get copied to the new class
            if ( !! classProps) {
                for (prop in classProps) {
                    child[prop] = classProps[prop];
                }
            }

            return child;
        };

        var extend = function(instanceProps, classProps) {
            var child = _extend(this, instanceProps, classProps);
            child.extend = extend;
            child.create = create;
            return child;
        };

        var create = function(constructorArgs) {
            var Ctor = this;
            return new Ctor(constructorArgs);
        };

        // function CoreObject() {}
        var CoreObject = function() {};

        CoreObject.extend = extend;
        CoreObject.create = create;

        return CoreObject;
    }
);