/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/descriptors/assignDescriptors',
    'library/util/descriptors/getDescriptors'

], function (

    assignDescriptors,
    getDescriptors

) {

    'use strict';

    var Child;

    return function extend(Parent, staticProps, protoProps) {
        Parent = Parent || null;
        staticProps = staticProps || {};
        protoProps = protoProps || {};

        if (protoProps.hasOwnProperty('constructor') && typeof protoProps.constructor === 'function') {
            Child = protoProps.constructor;
        } else if (typeof Parent === 'function') {
            Child = function Child() {
                return Parent.apply(this, arguments);
            };
        } else {
            Child = function Child() {};
        }

        Child.prototype = Object.create((Parent && Parent.prototype), getDescriptors(protoProps));
        return Object.defineProperties(Child, assignDescriptors(Parent, staticProps));
    };

});

/* ================================================================================================================== */
