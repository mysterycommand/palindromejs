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

    // console.log('ensureDescriptor', ensureDescriptor({configurable: true}));
    // console.log('ensureDescriptor', ensureDescriptor({enumerable: false}));
    // console.log('ensureDescriptor', ensureDescriptor({get: function() { return 'yes'; }}));
    // console.log('ensureDescriptor', ensureDescriptor({set: undefined}));
    // console.log('ensureDescriptor', ensureDescriptor({value: null}));
    // console.log('ensureDescriptor', ensureDescriptor({writable: true}));

    return function ensureDescriptor(obj) {
        if ( ! isDescriptor(obj)) { obj = {value: obj}; }

        var descriptor = {
            configurable: ((obj.hasOwnProperty('configurable')) ? obj.configurable : true),
            enumerable: ((obj.hasOwnProperty('enumerable')) ? obj.enumerable : true)
        };

        if (obj.hasOwnProperty('get') || obj.hasOwnProperty('set')) {
            descriptor.get = obj.get;
            descriptor.set = obj.set;
        } else {
            descriptor.value = obj.value;
            descriptor.writable = ((obj.hasOwnProperty('writable')) ? obj.writable : true);
        }

        return descriptor;
    };

});

/* ================================================================================================================== */
