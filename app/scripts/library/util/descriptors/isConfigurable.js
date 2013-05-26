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

    // console.log('isConfigurable', isConfigurable({configurable: true}));
    // console.log('isConfigurable', isConfigurable({configurable: false}));
    // console.log('isConfigurable', isConfigurable({}));

    return function isConfigurable(obj) {
        return obj.hasOwnProperty('configurable') && obj.configurable;
    };

});

/* ================================================================================================================== */
