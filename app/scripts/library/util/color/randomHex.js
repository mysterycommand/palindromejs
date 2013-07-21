/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint bitwise: false */

define([

], function (

) {

    'use strict';


    return function(prefix) {
        prefix = prefix || '#'; // '0x' might also come in handy?

        // Create a hex string between 0x000000 and 0xFFFFFF.
        var hex = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);

        // Pad the string with 0s and prepend the prefix.
        return prefix + (function(h) {
            return new Array(7 - h.length).join('0') + h;
        })(hex);
    };

});

/* ================================================================================================================== */
