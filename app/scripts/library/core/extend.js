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
    'library/util/descriptors/getDescriptors'

], function (

    assignDescriptors,
    getDescriptors

) {

    'use strict';

    /**
     * Takes a constructor function, a hash of static properties, and a prototype function that returns an object who's
     * who's properties will be assigned to a newly created constructor's prototype. The prototype function is called
     * with a reference to the base constructor's prototype for use as a kind-of "super".
     *
     * @param  {Function or null} Base          Base is the base class from which the new class will be extended.
     * @param  {Object}           staticProps   An object who's properties will be copied onto the new constructor.
     *                                          "Static" data descriptors marked as non-configurable and non-writable
     *                                          are not coppied to the new constructor.
     * @param  {Function}         protoFn       A function that returns an object who's properties will be copied onto
     *                                          the newly created constructor's prototype. This function will be invoked
     *                                          with a reference to the Base constructor's prototype for use as a kind-of
     *                                          "super".
     * @return {Function}                       A new constructor with the proper prototype chain set up.
     */
    return function extend(Base, staticProps, protoFn) {
        Base = Base || null;
        staticProps = staticProps || null;
        protoFn = protoFn || function() { return {}; };

        if (typeof protoFn !== 'function') { throw new TypeError(protoFn + ' is not a function'); }

        var baseProto = (Base && Base.prototype);
        var baseStatics = (Base && getDescriptors(Base)) || {};
        Object.keys(baseStatics).forEach(function(key) {
            // assume non-configurable and non-writable data descriptors, or non-configurable and non-settable accessor
            // descriptors are "static const", and should not be copied to the new class?
            if ((! baseStatics[key].configurable && ! baseStatics[key].writable && !! baseStatics[key].value) ||
                (! baseStatics[key].configurable && ! baseStatics[key].set && !! baseStatics[key].get)) {
                delete baseStatics[key];
            }
        });

        // Pass a reference to the Base.prototype (or null) for use as a kind-of "super".
        var protoProps = protoFn(baseProto);
        var Heir;

        if (protoProps.hasOwnProperty('constructor') && typeof protoProps.constructor === 'function') {
            // Use the constructor provided by the protoFn.
            Heir = protoProps.constructor;
        } else {
            // Build a constructor, calling the Base constructor if it exists. This should be discouraged?
            Heir = (typeof Base === 'function')
                ? function Heir() { return Base.apply(this, arguments); }
                : function Heir() {};
        }
        // Function.name is non-standard, and not implemented in IE. This *should* fix it, but doesn't … not sure why.
        if ( ! Heir.hasOwnProperty('name')) { Heir.name = Heir.toString().match(/function\s*(\w+)/)[1]; }

        Heir.prototype = Object.create(baseProto, getDescriptors(protoProps)); // Set up the prototype chain.
        return Object.defineProperties(Heir, assignDescriptors(baseStatics, staticProps)); // Assign static props.
    };

});

/* ================================================================================================================== */
