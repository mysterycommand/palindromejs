/** ====================================================================================================== **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
    ],
    function(
    ) {
        'use strict';

        var extendz = function(Parent, properties) {
            var Child;
            var propertiesObject = {};
            var descriptor;
            var property;

            if (properties.hasOwnProperty('constructor')) {
                Child = properties.constructor;
            } else {
                for (property in properties) {
                    if (property !== 'static') {
                        throw new Error('Objects with non-static members must define a constructor.');
                    }
                }
                Child = {};
            }

            if ( !! properties.static) {
                if ( !! properties.static.const) {
                    for (property in properties.static.const) {
                        Object.defineProperty(Child, property, {
                            value: properties.static.const[property],
                            configurable: false,
                            enumerable: true,
                            writable: false
                        });
                    }
                    delete properties.static.const;
                }

                for (property in properties.static) {
                    Object.defineProperty(Child, property, {
                        value: properties.static[property],
                        configurable: false,
                        enumerable: true,
                        writable: true
                    });
                }
                delete properties.static;
            }

            if ( !! properties.get) {
                for (property in properties.get) {
                    descriptor = propertiesObject[property] || {
                        configurable: false,
                        enumerable: true
                    };
                    descriptor.get = properties.get[property];

                    propertiesObject[property] = descriptor;
                }
                delete properties.get;
            }

            if ( !! properties.set) {
                for (property in properties.set) {
                    descriptor = propertiesObject[property] || {
                        configurable: false,
                        enumerable: true
                    };
                    descriptor.set = properties.set[property];

                    propertiesObject[property] = descriptor;
                }
                delete properties.set;
            }

            for (property in properties) {
                if (propertiesObject.hasOwnProperty(property)) {
                    throw new Error('The property ' + property + ' was already defined as: ' + propertiesObject[property]);
                }
                descriptor = {
                    value: properties[property],
                    configurable: false,
                    enumerable: true,
                    writable: true
                };
                propertiesObject[property] = descriptor;
            }

            Child.prototype = Object.create(Parent.prototype, propertiesObject);
            return Child;
        };

        return extendz;
    }
);