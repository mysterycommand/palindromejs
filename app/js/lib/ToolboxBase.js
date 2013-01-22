define(
    [
        'lodash'
    ],
    function(
        _
    ) {
        'use strict';

        // Shared empty constructor function to aid in prototype-chain creation.
        var Ctor = function () {};

        // Helper function to correctly set up the prototype chain, for subclasses.
        // Similar to `goog.inherits`, but uses a hash of prototype properties and
        // class properties to be extended.
        var inherits = function (parent, protoProps, staticProps) {
            var child;

            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call `super()`.
            if (protoProps && protoProps.hasOwnProperty('constructor')) {
                child = protoProps.constructor;
            } else {
                child = function () { return parent.apply(this, arguments); };
            }

            // Inherit class (static) properties from parent.
            // console.log(_.extend);
            _.extend(child, parent);

            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
            Ctor.prototype = parent.prototype;
            child.prototype = new Ctor();

            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if (protoProps) { _.extend(child.prototype, protoProps); }

            // Add static properties to the constructor function, if supplied.
            if (staticProps) { _.extend(child, staticProps); }

            // Correctly set child's `prototype.constructor`.
            child.prototype.constructor = child;

            // Set a convenience property in case the parent's prototype is needed later.
            child.proto = parent.prototype;

            return child;
        };

        // Self-propagating extend function.
        // Create a new class that inherits from the class found in the `this` context object.
        // This function is meant to be called in the context of a constructor function.
        var extendThis = function(protoProps, staticProps) {
            var child = inherits(this, protoProps, staticProps);
            child.extend = extendThis;
            return child;
        };

        var create = function(constructorArgs) {
            var Ctor = this;
            return new Ctor(constructorArgs);
        };

        // A primitive base class for creating subclasses.
        // All subclasses will have the `extend` function.
        // Example:
        //     var MyClass = Toolbox.Base.extend({
        //         someProp: 'My property value',
        //         someMethod: function () { ... }
        //     });
        //     var instance = new MyClass();
        var ToolboxBase = function () {};

        ToolboxBase.extend = extendThis;
        ToolboxBase.create = create;

        return ToolboxBase;

    }
);