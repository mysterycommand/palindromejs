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

    return function extend(Superclass, staticProps, protoFn) {
        Superclass = Superclass || null;
        staticProps = staticProps || null;
        protoFn = protoFn || function() { return {}; };

        if (typeof protoFn !== 'function') { throw new TypeError(protoFn + ' is not a function'); }

        var superProto = (Superclass && Superclass.prototype);
        var protoProps = protoFn(superProto);
        var Subclass;

        if (protoProps.hasOwnProperty('constructor') && typeof protoProps.constructor === 'function') {
            Subclass = protoProps.constructor;
        } else {
            Subclass = (typeof Superclass === 'function')
                ? function Subclass() { return Superclass.apply(this, arguments); }
                : function Subclass() {};
        }

        Subclass.prototype = Object.create(superProto, getDescriptors(protoProps));
        return Object.defineProperties(Subclass, assignDescriptors(Superclass, staticProps));
    };

});

/* ================================================================================================================== */
