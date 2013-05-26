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

    var definition;
    var property;

    var isArray;
    var isBoolean;
    var isFunction;
    var isNumber;
    var isString;

    var isPrivate;
    var isConst;

    var isGetter;
    var isSetter;

    var isAccessor;
    var isData;

    var descriptor;

    /**
     * Provides 'sugar' syntax for creating private, and const-like property descriptors.
     *
     * @param  {Object} properties An object containing properties to be converted into property descriptors.
     *                             Defaults to {}. Supports use of standard property descriptors, but differs by:
     *
     *                                 1. defaults to creating 'public' (that is configurable, enumerable, and
     *                                    [in the case of data descriptors] writable) descriptor objects.
     *                                 2. allows the user to create 'flag' properties on the object, that
     *                                    augment the generated descriptor. Current supported flags are:
     *
     *                                    'private' - sets configurable and enumerable to false
     *                                    'const'   - sets configurable and writable to false
     *                                              - throws an error if it finds a set property
     *
     * @return {Object}            A valid properties definition object, to be used by Object.defineProperties
     *
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperties
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty
     */
    return function propertiesDefinition(properties) {
        definition = {};

        Object.keys(properties).forEach(function(key) {
            property = properties[key];

            isArray = Array.isArray(property);
            isBoolean = typeof property === 'boolean';
            isFunction = typeof property === 'function';
            isNumber = typeof property === 'number';
            isString = typeof property === 'string';

            isPrivate = false;
            isConst = false;

            if (isArray || isBoolean || isFunction || isNumber || isString) {
                // create 'public' data descriptors from primitives, arrays and functions
                descriptor = dataDescriptor({value: property}, isPrivate, isConst);
            } else {
                isGetter = property.hasOwnProperty('get');
                isSetter = property.hasOwnProperty('set');

                isAccessor = isGetter || isSetter;
                isData = property.hasOwnProperty('value');

                if ( ! (isAccessor || isData)) {
                    // allow for creating data descriptors from 'plain' objects
                    descriptor = dataDescriptor({value: property}, isPrivate, isConst);
                } else {
                    // create a descriptor from a property object with 'sugar syntax' flags
                    isPrivate = property.hasOwnProperty('private');
                    isConst = property.hasOwnProperty('const');

                    if (isAccessor && isData) { throw new Error('Mixed type property, get and set are incompatible with value.'); }
                    if (isConst && isSetter) { throw new Error('Constants must not have a set method.'); }

                    if (isAccessor) {
                        // handle accessor descriptor
                        descriptor = accessorDescriptor(property, isPrivate, isConst);
                    } else {
                        // handle data descriptor
                        descriptor = dataDescriptor(property, isPrivate, isConst);
                    }
                }
            }

            definition[key] = descriptor;
        });

        return definition;
    };

});

/* ================================================================================================================== */
