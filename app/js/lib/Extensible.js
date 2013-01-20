/** ====================================================================================================== **/
/**
 * @fileOverview
 * The core object enables OOP JavaScript by providing extend.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
        // dependency names
    ],
    function(
        // dependency arguments
    ) {
        'use strict';

        var Extensible = Object.create(Object.prototype, {});
        return Extensible;
    }
);