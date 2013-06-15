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

    var hash = {};
    /**
     * Generates a unique id based on a passed in key (generally a constructor name).
     *
     * @param   {String}    key     A key to use in the hash, for generating unique id's by constructor name.
     * @return  {String}            A string representation of the generated id.
     */
    return function unique(key) {
        if (typeof hash[key] === 'undefined') { hash[key] = -1; }
        return '' + (++hash[key]);
    };

});

/* ================================================================================================================== */
