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

    return function unique(key) {
        if (typeof hash[key] === 'undefined') { hash[key] = -1; }
        return '' + (++hash[key]);
    };

});

/* ================================================================================================================== */
