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

    var keys = ['configurable', 'enumerable', 'get', 'set', 'value', 'writable'];
    /**
     * Uses duck-typing to determine if an object is a (full or partial) property descriptor.
     *
     * @param   {Object}    src     The object who's properties will be inspected to determin if it is a (full or
     *                              partial) property descriptor.
     * @return  {Boolean}           True if the object has any of the keys: 'configurable', 'enumerable', 'get',
     *                              'set', 'value', or 'writable', false otherwise.
     */
    return function isDescriptor(obj) {
        return obj && keys.some(function(key) {
            return obj.hasOwnProperty(key);
        });
    };

});

/* ================================================================================================================== */
