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
    'library/util/descriptors/getDescriptors',
    'library/util/slice'

], function (

    ensureDescriptor,
    getDescriptors,
    slice

) {

    'use strict';

    return function assignDescriptors() {
        var srcs = slice.call(arguments)
            .filter(function(src) {
                return !! src; // filter out falsey (null) sources
            });
        if (srcs.length === 0) { return {}; }
        if (srcs.length === 1) { return getDescriptors(srcs.shift()); }

        var descriptors = getDescriptors(srcs.shift());
        srcs.forEach(function(src) {
            Object.keys(getDescriptors(src))
                .forEach(function(key) {
                    if (descriptors.hasOwnProperty(key) &&
                        descriptors[key].configurable === false) {
                        // don't override own & non-configurable descriptors
                        throw new TypeError('Cannot redefine property: ', key);
                    } else {
                        descriptors[key] = ensureDescriptor(src[key]);
                    }
                });
        });
        return descriptors;
    };

});

/* ================================================================================================================== */
