/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true */

define([

    'library/util/descriptors/assignDescriptors',
    'library/util/descriptors/getDescriptors',
    'library/util/slice'

], function (

    assignDescriptors,
    getDescriptors,
    slice

) {

    'use strict';

    return function extend(Base, staticProps, protoFn) {
        Base = Base || null;
        staticProps = staticProps || null;
        protoFn = protoFn || function() { return {}; };

        if (typeof protoFn !== 'function') { throw new TypeError(protoFn + ' is not a function'); }

        var baseClass = (Base && Base.prototype);
        var protoProps = protoFn(baseClass);
        var Heir;

        if (protoProps.hasOwnProperty('constructor') && typeof protoProps.constructor === 'function') {
            Heir = protoProps.constructor;
        } else {
            Heir = (typeof Base === 'function')
                ? function Heir() { return Base.apply(this, arguments); }
                : function Heir() {};
        }

        Heir.prototype = Object.create(baseClass, getDescriptors(protoProps));
        return Object.defineProperties(Heir, assignDescriptors(Base, staticProps));
    };

});

/* ================================================================================================================== */
