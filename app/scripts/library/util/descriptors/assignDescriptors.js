/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/descriptors/isDescriptor',
    'library/util/descriptors/isConfigurable',
    'library/util/descriptors/getDescriptors',
    'library/util/descriptors/ensureDescriptor'

], function (

    isDescriptor,
    isConfigurable,
    getDescriptors,
    ensureDescriptor

) {

    'use strict';

    var slice = Array.prototype.slice;

    return function assignDescriptors(target) {
        target = target || {};

        var sources = slice.call(arguments, 1)
            .filter(function(source) {
                return !! source; // remove falsey sources
            });
        if (sources.length === 0) { return target; }

        // the accumulated properties descriptor/definition
        var descriptor = {};
        sources
            .map(function(source) {
                // only deal with descriptor hashes
                return getDescriptors(source);
            })
            .forEach(function(source) {
                Object.keys(source).forEach(function(key) {
                    if (descriptor.hasOwnProperty(key) && isDescriptor(descriptor[key]) && ! isConfigurable(descriptor[key])) {
                        // don't override own & non-configurable descriptors
                        throw new TypeError('Cannot redefine property: ', key);
                    } else {
                        descriptor[key] = ensureDescriptor(source[key]);
                    }
                });
            });
        // console.log(descriptor);

        return Object.defineProperties(target, descriptor);
    };

});

/* ================================================================================================================== */
