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

    /**
     * This is a (maybe crude) implementation of a generic 'assign', 'extend', or 'copy' function. Copies subsequent
     * sources into the first argument passed.
     *
     * @param   {...}   arguments   One or more arguments. Properties will be copied onto the first argument. Later
     *                              argument's properties will override earlier argument's properties.
     * @return  {Object}            The first argument passed, with all subsequent argument's properties copied
     *                              onto it.
     */
    return function assign() {
        var srcs = slice.call(arguments)
            .filter(function(src) {
                return (!! src); // filter out falsey (null) sources
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
