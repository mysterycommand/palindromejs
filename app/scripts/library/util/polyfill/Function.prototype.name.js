/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 * @see  http://matt.scharley.me/2012/03/09/monkey-patch-name-ie.html
 */
/* ================================================================================================================== */

require([
], function (
) {

    'use strict';

    (function() {
        if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
            Object.defineProperty(Function.prototype, 'name', {
                get: function() {
                    return this.toString().match(/function\s*(\w+)/)[1];
                }
            });
        }
    }());

});

/* ================================================================================================================== */
