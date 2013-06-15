/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/descriptors/isDescriptor'

], function (

    isDescriptor

) {

    'use strict';

    /**
     * Accepts an object, and returns a valid property descriptor, but defaults to creating 'public' descriptors
     * (that is similar to what you'd get if you directly declared properties on an object ... configurable,
     * enumerable, and [in the case of data descriptors] writable).
     *
     * @param   {Object}    src     An object to convert to a property descriptor. Passing a partial descriptor
     *                              will return a full valid 'public' descriptor. Passing anything other than
     *                              a partial descriptor will return a data descriptor with the object passed
     *                              as the value property.
     * @return  {Object}            A valid property descriptor.
     */
    return function ensureDescriptor(src) {
        if (! isDescriptor(src)) { src = {value: src}; }

        var descriptor = {
            configurable: ((src.hasOwnProperty('configurable')) ? src.configurable : true),
            enumerable: ((src.hasOwnProperty('enumerable')) ? src.enumerable : true)
        };

        if (src.hasOwnProperty('get') || src.hasOwnProperty('set')) {
            descriptor.get = src.get;
            descriptor.set = src.set;
        } else {
            descriptor.value = src.value;
            descriptor.writable = ((src.hasOwnProperty('writable')) ? src.writable : true);
        }

        return descriptor;
    };

});

/* ================================================================================================================== */
