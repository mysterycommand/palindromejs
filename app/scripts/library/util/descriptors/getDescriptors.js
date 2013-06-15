/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/descriptors/ensureDescriptor',
    'library/util/descriptors/isDescriptor'

], function (

    ensureDescriptor,
    isDescriptor

) {

    'use strict';

    /**
     * Collects and returns all the own property descriptors from a passed in source.
     *
     * @param   {Object}    src     The object who's own properties will be iterated over to generated the returned
     *                              property descriptor.
     * @return  {Object}            A valid property descriptor for all own properties of 'src'.
     */
    return function getDescriptors(src) {
        if (! src) { return {}; }

        var descriptors = {};
        Object.keys(src).forEach(function(key) {
            if (isDescriptor(src[key])) { descriptors[key] = ensureDescriptor(src[key]); }
            else { descriptors[key] = Object.getOwnPropertyDescriptor(src, key); }
        });
        return descriptors;
    };

});

/* ================================================================================================================== */
