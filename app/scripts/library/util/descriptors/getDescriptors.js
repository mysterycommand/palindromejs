/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/descriptors/isDescriptor'

], function (

    isDescriptor

) {

    'use strict';

    return function getDescriptors(obj) {
        var descriptors = {};

        Object.keys(obj).forEach(function(key) {
            if (isDescriptor(obj[key])) { descriptors[key] = obj[key]; }
            else { descriptors[key] = Object.getOwnPropertyDescriptor(obj, key); }
        });

        return descriptors;
    };

});

/* ================================================================================================================== */
