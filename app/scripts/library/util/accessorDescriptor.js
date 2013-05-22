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
     * Takes a property object, and returns an accessor descriptor, with 'configurable', 'enumerable',
     * and at least one of 'get' or 'set'.
     *
     * @param  {Object}  property  A property object to convert to a descriptor. Must contain at least one of 'get'
     *                             or 'set'. May contain 'configurable' and/or 'enumerable'.
     *
     * @param  {Boolean} isPrivate Equivalent to {configurable: false, enumerable: false} in the property object.
     * @param  {Boolean} isConst   Equivalent to {configurable: false} in the property object. No 'set' allowed.
     *
     * @return {Object}            An accessor descriptor with 'enumerable', 'configurable', and at least one of
     *                             'get' or 'set'.
     *
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty
     */
    return function accessorDescriptor(property, isPrivate, isConst) {
        var isGetter = property.hasOwnProperty('get');
        var isSetter = property.hasOwnProperty('set');

        if ( ! (isSetter || isGetter)) {
            throw new Error('Accessor descriptors must have at least one own property \'get\' or \'set\'.');
        }

        if ((isSetter && property.set) && isConst) {
            throw new Error('Constant accessors must be read only. They cannot have a set method.');
        }

        var descriptor = {
            configurable: ( ! (isPrivate || isConst)),
            enumerable: (! isPrivate)
        };

        // If property has one of these keys set, we're going to override it on the descriptor we just created.
        override(descriptor, property, ['configurable', 'enumerable', 'get', 'set']);

        return descriptor;
    };

});

/* ================================================================================================================== */
