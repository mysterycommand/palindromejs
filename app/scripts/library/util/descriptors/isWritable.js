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

    // console.log('isWritable', isWritable({writable: true}));
    // console.log('isWritable', isWritable({writable: false}));
    // console.log('isWritable', isWritable({}));

    return function isWritable(obj) {
        return obj.hasOwnProperty('writable') && obj.writable;
    };

});

/* ================================================================================================================== */
