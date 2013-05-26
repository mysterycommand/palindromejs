/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/override'

], function (

    override

) {

    'use strict';

    /**
     * Takes a property object, and returns a data descriptor, with 'configurable', 'enumerable', 'writable'
     * and 'value'.
     *
     * @param  {Object}  property  A property object to convert to a descriptor. Must contain at least 'value'.
     *                             May contain 'configurable', 'enumerable', and/or 'writable'.
     *
     * @param  {Boolean} isPrivate Equivalent to {configurable: false, enumerable: false} in the property object.
     * @param  {Boolean} isConst   Equivalent to {configurable: false, writable: false} in the property object.
     *
     * @return {Object}            An accessor descriptor with 'enumerable', 'configurable', 'writable' and 'value'.
     *
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty
     */
    return function dataDescriptor(property, isPrivate, isConst) {
        var isGetter = property.hasOwnProperty('get');
        var isSetter = property.hasOwnProperty('set');
        var isData = property.hasOwnProperty('value');

        if (isSetter || isGetter) {
            throw new Error('Data descriptors are incompatible with own properties \'get\' or \'set\'.');
        }

        if ( ! isData) {
            throw new Error('Data descriptors must have at least one own property \'value\'.');
        }

        var descriptor = {
            configurable: ( ! (isPrivate || isConst)),
            enumerable: ( ! isPrivate),
            writable: ( ! isConst)
        };

        // If property has one of these keys set, we're going to override it on the descriptor we just created.
        override(descriptor, property, ['configurable', 'enumerable', 'value', 'writable']);

        return descriptor;
    };

});

/* ================================================================================================================== */
