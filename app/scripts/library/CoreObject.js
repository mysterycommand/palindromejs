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

    'library/util/extend'

], function (

    extend

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
                this.incNumInstances();
                var inst = new this(arguments);

                // It would be cool if I could figure out a way to enforce using Constructor.create();
                // var Ctor = function() {};
                // Ctor.prototype = Object.create(this.prototype);
                // var inst = this.apply(new Ctor(), arguments);

                var name = inst.instanceName;
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
            // console.log(this.constructorName + '#constructor', arguments);
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
            private: true,
            get: function() {
                // console.log(this.constructorName + '#typeName');
                if (this._type) { return this._type; }
                return this._type = typeof this;
            }
        },
        constructorName: {
            private: true,
            get: function() {
                // console.log(this.constructorName + '#constructorName');
                if (this._ctor) { return this._ctor; }
                return this._ctor = this.constructor.toString().match(/function\s*(\w+)/)[1];
            }
        },
        instanceName: {
            private: true,
            get: function() {
                // console.log(this.constructorName + '#instanceName');
                if (this._name) { return this._name; }
                return this._name = this.constructorName.substring(0, 1).toLowerCase() + this.constructorName.substring(1) + this.instanceIndex;
            }
        },
        instanceIndex: {
            private: true,
            get: function() {
                // console.log(this.constructorName + '#instanceIndex');
                if (this._instanceIndex) { return this._instanceIndex; }
                return this._instanceIndex = this.constructor.numInstances - 1; // numInstances is like Array.length
            }
        }
    });

    // This is only required for CoreObject because it's not created by a Parent.extend call.
    CoreObject.initNumInstances();

    return CoreObject;

});

/* ================================================================================================================== */
