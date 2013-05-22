/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

], function (

) {

    'use strict';

    /**
     * Iterates over 'keys', checks 'source' for an own property of that name, and (if it exists) sets it on 'target'.
     *
     * @param  {Object} target The object who's properties will be overridden.
     * @param  {Object} source The object who's property values (if own properties are found) will be written.
     * @param  {Array}  keys   The array of property names to check for in 'source', and write into 'target'.
     */
    return function override(target, source, keys) {
        keys.forEach(function(key) {
            // console.log('override', key, source.hasOwnProperty(key));
            if (source.hasOwnProperty(key)) { target[key] = source[key]; }
        });
    };

});

/* ================================================================================================================== */
