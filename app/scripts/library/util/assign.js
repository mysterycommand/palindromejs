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

    return function assign() {
        var srcs = slice.call(arguments)
            .filter(function(src) {
                return !! src; // filter out falsey (null) sources
            });
        if (srcs.length === 0) { return {}; }
        if (srcs.length === 1) { return srcs.shift(); }

        var trgt = srcs.shift();
        srcs.forEach(function(src) {
            Object.keys(src)
                .forEach(function(key) {
                    trgt[key] = src[key];
                });
        });
        return trgt;
    };

});

/* ================================================================================================================== */
