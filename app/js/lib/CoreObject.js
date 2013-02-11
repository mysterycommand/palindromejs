/** ====================================================================================================== **/
/**
 * @fileOverview
 * The base 'class' for all objects in the Palindrome JS framework. Sets up inheritence.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
        'lib/util/extendz'
    ],
    function(
        extendz
    ) {
        'use strict';

        var CoreObject = extendz({

        });

        return CoreObject;
    }
);