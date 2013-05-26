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

    // console.log('isDescriptor', isDescriptor({configurable: true}));
    // console.log('isDescriptor', isDescriptor({enumerable: false}));
    // console.log('isDescriptor', isDescriptor({get: function() { return 'yes'; }}));
    // console.log('isDescriptor', isDescriptor({set: undefined}));
    // console.log('isDescriptor', isDescriptor({value: null}));
    // console.log('isDescriptor', isDescriptor({writable: true}));

    var keys = ['configurable', 'enumerable', 'get', 'set', 'value', 'writable'];
    return function isDescriptor(obj) {
        return keys.some(function(key) {
            return obj.hasOwnProperty(key);
        });
    };

});

/* ================================================================================================================== */
