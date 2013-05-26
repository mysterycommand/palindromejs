/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/assign',
    'library/util/propertiesDefinition'

], function (

    assign,
    propertiesDefinition

) {

    'use strict';

    /**
     * Extend takes a parent object (or null) and returns a child with the proper prototype chain setup. It also
     * provides 'sugar' syntax for creating private, static, and const-like property descriptors.
     *
     * @param  {Object} Parent     The parent of newly created object. Defaults to null.
     *
     * @param  {Object} properties An object containing properties to be converted into property descriptors,
     *                             and set on the new object's prototype. Defaults to {}. Supports use of
     *                             standard property descriptors, but differs by:
     *
     *                                 1. defaults to creating 'public' (that is configurable, enumerable, and
     *                                    [in the case of data descriptors] writable) descriptor objects.
     *                                 2. allows the user to create 'flag' properties on the object, that
     *                                    augment the generated descriptor. Current supported flags are:
     *
     *                                    'private' - sets configurable and enumerable to false
     *                                    'const'   - sets configurable and writable to false
     *                                              - throws an error if it finds a set property
     *
     * @return {Object}            An object who's parentage is setup through Parent.prototype (or null), and
     *                             that has properties created with data or accessor descriptors generated
     *                             from the properties argument.
     *
     * @see  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
     */

    var Child;
    var constructorPropertiesDefinition;
    var prototypePropertiesDefinition;

    return function extend(Parent, constructorProperties, prototypeProperties) {
        Parent = Parent || null;
        constructorProperties = constructorProperties || {};
        prototypeProperties = prototypeProperties || {};

        // console.log('constructorPropertiesDefinition', constructorPropertiesDefinition);
        // console.log('prototypePropertiesDefinition', prototypePropertiesDefinition);

        if (prototypeProperties.hasOwnProperty('constructor')) {
            Child = prototypeProperties.constructor;
        } else if (Parent && typeof Parent === 'function') {
            Child = function Child() {
                Parent.apply(this, arguments);
            };
        } else {
            Child = function Child() {};
        }

        constructorPropertiesDefinition = propertiesDefinition(constructorProperties);
        prototypePropertiesDefinition = propertiesDefinition(prototypeProperties);

        var prototype = (Parent && Parent.prototype) ? Parent.prototype : null;
        Child.prototype = Object.create(prototype, prototypePropertiesDefinition);
        assign({}, Parent);
        assign(Child, Parent, constructorPropertiesDefinition);
        console.log(Child.id);

        return Child;
    };

});

/* ================================================================================================================== */
