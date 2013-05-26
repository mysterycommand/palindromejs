/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/slice',
    'library/util/accessorDescriptor',
    'library/util/dataDescriptor'

], function (

    slice,
    accessorDescriptor,
    dataDescriptor

) {

    'use strict';

    return function assign(target) {
        var sources = slice.call(arguments, 1);
        var source = sources[0];

        if ( ! source) {
            if (sources.length > 1) {
                // skip any null values in the sources list
                sources = sources.slice(1);
                source = sources[0];
            } else {
                return target;
            }
        }

        if (sources.length > 1) {
            source = assign.apply(null, sources);
        }

        var descriptor;
        var properties = {};

        Object.keys(source).forEach(function(key, i) {
            descriptor = Object.getOwnPropertyDescriptor(source, key);
            properties[key] = descriptor;
        });

        Object.defineProperties(target, properties);
        return target;
    };

});

/* ================================================================================================================== */
