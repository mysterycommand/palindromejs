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
    ],
    function(
    ) {
        'use strict';

        var _extend = function(parent, instanceProps, classProps) {
            var child;
            var prop;

            if (instanceProps && instanceProps.hasOwnProperty('constructor')) {
                child = instanceProps.constructor;
                delete instanceProps.constructor;
            } else {
                child = function() { return parent.apply(this, arguments); };
            }

            var propsObj = {};
            var isPrivate;
            var isMethod;

            var isGetter;
            var isSetter;

            var propName;
            var privatePropName;
            var hasMatchingPrivateProp;

            var setterName;
            var hasMatchingSetter;

            var getterName;
            var hasMatchingGetter;

            if ( !! instanceProps) {
                for (prop in instanceProps) {
                    isPrivate = prop.indexOf('_') === 0;

                    if (isPrivate) {
                        propsObj[prop] = {
                            value: instanceProps[prop],
                            writable: true,
                            enumerable: false,
                            configurable: false
                        };
                    } else {
                        isMethod = typeof instanceProps[prop] === 'function';

                        if (isMethod) {
                            isGetter = prop.indexOf('get') === 0;
                            isSetter = prop.indexOf('set') === 0;
                            propName = prop;

                            if (isGetter || isSetter) {
                                // getProperty becomes property and _property
                                propName = prop.substr(3, 1).toLowerCase() + prop.substr(4);
                                privatePropName = '_' + propName;
                                hasMatchingPrivateProp = ( !! instanceProps[privatePropName]);

                                if (hasMatchingPrivateProp) {
                                    propsObj[privatePropName] = {
                                        value: instanceProps[privatePropName],
                                        writable: true, // this could maybe be false, if there's no matching setter
                                        enumerable: false,
                                        configurable: false
                                    };
                                    delete instanceProps[privatePropName];
                                    // delete the private property so we don't iterate over it again
                                }
                            }

                            // it's a public method
                            propsObj[propName] = {
                                enumerable: true,
                                configurable: false
                            };

                            if (isGetter) {
                                propsObj[propName].get = instanceProps[prop];
                                // we found a getter, look for a setter
                                setterName = 's' + prop.substr(1);
                                hasMatchingSetter = ( !! instanceProps[setterName]);
                                if (hasMatchingSetter) {
                                    // we found a matching setter
                                    propsObj[propName].set = instanceProps[setterName];
                                    delete instanceProps[setterName];
                                    // delete the setter so we don't iterate over it again
                                }
                            } else if (isSetter) {
                                propsObj[propName].set = instanceProps[prop];
                                // we found a setter, look for a getter
                                getterName = 'g' + prop.substr(1);
                                hasMatchingGetter = ( !! instanceProps[getterName]);
                                if (hasMatchingGetter) {
                                    // we found a matching getter
                                    propsObj[propName].get = instanceProps[getterName];
                                    delete instanceProps[getterName];
                                    // delete the getter so we don't iterate over it again
                                }
                            } else {
                                // it's just a regular method
                                propsObj[propName].value = instanceProps[prop];
                                propsObj[propName].writable = true;
                            }
                        } else {
                            // it's a public property
                            propsObj[prop] = {
                                value: instanceProps[prop],
                                writable: true,
                                enumerable: true,
                                configurable: false
                            };
                        }
                    }
                }
            }

            child.prototype = Object.create(parent.prototype, propsObj);
            child.prototype.constructor = child;
            child.proto = parent.prototype;

            // own properies of the parent get copied to the new class
            for (prop in parent) {
                if (parent.hasOwnProperty(prop)) {
                    child[prop] = parent[prop];
                }
            }

            // class properties get copied to the new class
            if ( !! classProps) {
                for (prop in classProps) {
                    child[prop] = classProps[prop];
                }
            }

            return child;
        };

        var extend = function(instanceProps, classProps) {
            var child = _extend(this, instanceProps, classProps);
            child.extend = extend;
            child.create = create;
            return child;
        };

        var create = function(constructorArgs) {
            var Ctor = this;
            return new Ctor(constructorArgs);
        };

        // function CoreObject() {}
        var CoreObject = function() {};

        CoreObject.extend = extend;
        CoreObject.create = create;

        return CoreObject;
    }
);