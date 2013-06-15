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

    return function getDescriptors(src) {
        if ( ! src) { return {}; }

        var descriptors = {};
        Object.keys(src).forEach(function(key) {
            if (isDescriptor(src[key])) { descriptors[key] = ensureDescriptor(src[key]); }
            else { descriptors[key] = Object.getOwnPropertyDescriptor(src, key); }
        });
        return descriptors;
    };

});

/* ================================================================================================================== */
