/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint newcap: false, boss: true */

define([

    'library/util/extend',
    'library/util/unique'

], function (

    extend,
    unique

) {

    'use strict';

    var CoreObject = extend(Object, {
        extend: {
            static: true,
            value: function(props) {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#extend', arguments);
                var Child = extend(this, props);
                Child.initNumInstances();
                return Child;
            }
        },
        create: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#create', arguments);

                // // It would be cool to enforce using 'Class.create' to keep numInstances always right.
                // // Unfortunately, I think, 'self.apply(this, args)' is a lot slower than 'new'.
                // var args = [].splice(arguments);
                // var self = this;
                // function Creator() {
                //     return self.apply(this, [true].concat(args));
                // }
                // Creator.prototype = this.prototype;
                // var inst = new Creator();

                var inst = new this(arguments);

                // // Called in the constructor, so you can use new or create.
                // this.incNumInstances();
                // var n = inst.instanceName;

                return inst;
            }
        },
        initNumInstances: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#initNumInstances', arguments);
                Object.defineProperty(this, '_numInstances', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: 0
                });
            }
        },
        numInstances: {
            static: true,
            get: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#numInstances', arguments);
                return this._numInstances;
            }
        },
        incNumInstances: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#incNumInstances', arguments);
                this._numInstances = this.numInstances + 1;
            }
        },
        decNumInstances: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#decNumInstances', arguments);
                this._numInstances = this.numInstances - 1;
            }
        },
        constructor: function CoreObject() {
            // console.log(this.constructorName + '#constructor', this, arguments);
            this.constructor.incNumInstances();
            Object.defineProperties(this, {});
            var n = this.instanceName;
        },
        destroy: function() {
            // console.log(this.constructorName + '#destroy', arguments);
            this.constructor.decNumInstances();
            return null;
        },
        can: function(key) {
            // console.log(this.constructorName + '#can', arguments);
            return typeof this[key] === 'function';
        },
        has: function(key) {
            // console.log(this.constructorName + '#has', arguments);
            return this.hasOwnProperty(key);
        },
        toString: function() {
            // console.log(this.constructorName + '#toString');
            return '[' + this.typeName + ' ' + this.constructorName + ']';
        },
        typeName: {
            get: function() {
                // console.log(this.constructorName + '#typeName');
                if (this._type) { return this._type; }
                return this._type = typeof this;
            }
        },
        constructorName: {
            get: function() {
                // console.log(this.constructor.name + '#constructorName');
                if (this._ctor) { return this._ctor; }
                return this._ctor = this.constructor.name;
            }
        },
        instanceName: {
            get: function() {
                // console.log(this.constructorName + '#instanceName');
                if (this._name) { return this._name; }
                return this._name = this.constructorName.substring(0, 1).toLowerCase() + this.constructorName.substring(1) + this.instanceId;
            }
        },
        instanceId: {
            get: function() {
                if (this._id) { return this._id; }
                return this._id = unique(this.constructorName);
            }
        }
    });

    // This is only required for CoreObject because it's not created by a Class.extend call.
    // CoreObject.initNumInstances();

    return CoreObject;

});

/* ================================================================================================================== */
