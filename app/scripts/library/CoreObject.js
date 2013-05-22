/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

], function (

) {

    'use strict';

    var override = function(target, source, keys) {
        keys.forEach(function(key) {
            if (source.hasOwnProperty(key)) { target[key] = source[key]; }
        });
    };

    var accessorDescriptor = function(property, isPrivate, isConst) {
        var descriptor = {
            configurable: ( ! isPrivate),
            enumerable: (! isPrivate),
            get: property.get,
            set: property.set
        };
        override(descriptor, property, ['configurable', 'enumerable', 'get', 'set']);

        return descriptor;
    };

    var dataDescriptor = function(property, isPrivate, isConst) {
        var descriptor = {
            configurable: ( ! isPrivate),
            enumerable: (! isPrivate),
            value: property.value,
            writable: ( ! isConst)
        };
        override(descriptor, property, ['configurable', 'enumerable', 'value', 'writable']);

        return descriptor;
    };

    var extend = function(Parent, properties) {
        properties = properties || {};

        var Child;
        var staticPropertiesObject = {};
        var propertiesObject = {};
        var property;
        var descriptor;

        var isGetter;
        var isSetter;

        // var isReadOnly;
        // var isWriteOnly;

        var isAccessor;
        var isData;

        var isPrivate;
        var isStatic;
        var isConst;

        Object.keys(properties).forEach(function(key) {
            if (key === 'constructor') { return; }

            property = properties[key];
            isGetter = property.hasOwnProperty('get');
            isSetter = property.hasOwnProperty('set');

            // isReadOnly = isGetter && ! isSetter;
            // isWriteOnly = ! isGetter && isSetter;

            isAccessor = isGetter || isSetter;
            isData = property.hasOwnProperty('value');

            isPrivate = property.hasOwnProperty('private');
            isStatic = property.hasOwnProperty('static');
            isConst = property.hasOwnProperty('const');

            if ( ! (isAccessor || isData)) { throw new Error('Property descriptors must be either accessors (use get/set) or data (use value).'); }
            if (isAccessor && isData) { throw new Error('Property descriptors can be either accessors (use get/set) or data (use value), not both.'); }
            if (isConst && isSetter) { throw new Error('Constants must not have a set method.'); }

            if (isAccessor) {
                // handle accessor descriptor
                descriptor = accessorDescriptor(property, isPrivate, isConst);
            } else {
                // handle data descriptor
                descriptor = dataDescriptor(property, isPrivate, isConst);
            }

            if (isStatic) {
                staticPropertiesObject[key] = descriptor;
            } else {
                propertiesObject[key] = descriptor;
            }
        });

        if (properties.hasOwnProperty('constructor')) {
            Child = properties.constructor;
        } else if (Object.keys(propertiesObject).length > 0) {
            Child = function Child() {};
        } else {
            Child = function Child() { throw new Error('Static-only, constructor-less objects should not be instantiated?'); };
        }

        // ALLOW null?
        Child.prototype = Object.create(Parent.prototype, propertiesObject);
        Object.defineProperties(Child, staticPropertiesObject);
        return Child;
    };

    // private === configurable: false, enumerable: false
    // static === applied to Child (not Child.prototype)
    // const === configurable: false, writable: false (or set throws an error)

    var CoreObject = extend(Object, {
        extend: {
            static: true,
            const: true,
            value: function(props) {
                console.log('CoreObject#extend', arguments);
                var Child = extend(this, props);

                Child.extend = CoreObject.extend;
                Child.create = CoreObject.create;

                return Child;
            }
        },
        create: {
            static: true,
            const: true,
            value: function() {
                console.log('CoreObject#create', arguments);
                var This = this;
                return new This(arguments);
            }
        },
        constructor: function CoreObject() {
            console.log('CoreObject#constructor');
        },
        toString: {
            value: function() {
            }
        }
    });

    return CoreObject;

});

/* ================================================================================================================== */
