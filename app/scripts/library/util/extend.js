/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/accessorDescriptor',
    'library/util/dataDescriptor'

], function (

    accessorDescriptor,
    dataDescriptor

) {

    'use strict';

    /**
     * Extend takes a parent object (or null) and returns a child with the proper prototype chain setup. It also
     * provides 'sugar' syntax for creating private, static, and const-like property descriptors.
     *
     * @param  {Object} Parent     The parent of newly created object. Defaults to null.
     *
     * @param  {Object} properties An object containing properties to be converted into property descriptors,
     *                             and set on the new object's prototype. Defaults to {}. Supports use of
     *                             standard property descriptors, but differs by:
     *
     *                                 1. defaults to creating 'public' (that is configurable, enumerable, and
     *                                    [in the case of data descriptors] writable) descriptor objects.
     *                                 2. allows the user to create 'flag' properties on the object, that
     *                                    augment the generated descriptor. Current supported flags are:
     *
     *                                    'private' - sets configurable and enumerable to false
     *                                    'const'   - sets configurable and writable to false
     *                                              - throws an error if it finds a set property
     *                                    'static'  - sets the generated descriptor on the returned object
     *                                                as opposed to on the object's prototype
     *
     * @return {Object}            An object who's parentage is setup through Parent.prototype (or null), and
     *                             that has properties created with data or accessor descriptors generated
     *                             from the properties argument.
     *
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperties
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty
     */
    return function extend(Parent, properties) {
        Parent = Parent || null;
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

            if ( ! (isAccessor || isData)) { throw new Error('Property descriptors must have at least one property named get, set, or value.'); }
            if (isAccessor && isData) { throw new Error('Mixed type property descirptor, get and set are incompatible with value.'); }
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

        var proto = null;
        if (Parent && Parent.prototype) { proto = Parent.prototype; }

        Child.prototype = Object.create(proto, propertiesObject);
        Object.defineProperties(Child, staticPropertiesObject);
        return Child;
    };

});

/* ================================================================================================================== */