/** ====================================================================================================== **/
/**
 * @fileOverview
 * The base 'class' for all objects in the Palindrome JS framework. Sets up inheritence.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
        'lib/util/extendz'
    ],
    function(
        extendz
    ) {
        'use strict';

        var extend = function(properties) {
            var Child = extendz(this, properties);

            Child.extend = extend;
            Child.create = create;
            
            return Child;
        };

        var create = function() {
            // I think this would work, but I think using 'new' is significantly faster.
            // TODO: Find JSPerf tests to support my assumption.
            // return this.apply(this, arguments);
            
            var This = this;
            return new This(arguments);
        };

        var CoreObject = extendz(Object, {
            static: {
                extend: extend,
                create: create
            },
            constructor: function CoreObject() {
            },
            toString: function() {
                var ctor = this.constructor.toString();
                return '[' + (typeof this) + ' ' + (ctor.match(/function\s+(\w*)/)[1]) + ']';
            }
        });

        return CoreObject;
    }
);