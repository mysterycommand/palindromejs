/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/slice'

], function (

    slice

) {

    'use strict';

    return function assign(target) {
        target = target || {};

        var sources = slice.call(arguments, 1)
            .filter(function(source) {
                return !! source; // remove falsey sources
            });
        if (sources.length === 0) { return target; }

        sources.forEach(function(source) {
            Object.keys(source).forEach(function(key) {
                target[key] = source[key];
            });
        });
        return target;
    };

});

/* ================================================================================================================== */
