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

        var CoreObject = extendz(Object, {
            static: {
                const: {
                    extend: function(properties) {
                        var Child = extendz(this, properties);

                        Child.extend = CoreObject.extend;
                        Child.create = CoreObject.create;
                        
                        return Child;
                    },
                    create: function(options) {
                        var This = this;
                        return new This(options);
                    }
                }
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