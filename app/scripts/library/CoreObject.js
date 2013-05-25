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
                var instance = new this(arguments);
                var name = instance.instanceName;
                return instance;
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
            // console.log('CoreObject#constructor');
        },
        destroy: function() {
            // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#destroy', arguments);
            this.constructor.decNumInstances();
            return this;
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
                // console.log(this.constructorName + '#constructorName');
                if (this._name) { return this._name; }
                return this._ctor = this.constructor.toString().match(/function\s*(\w+)/)[1];
            }
        },
        instanceName: {
            get: function() {
                // console.log(this.constructorName + '#instanceName');
                if (this._name) { return this._name; }
                return this._name = this.constructorName.substring(0, 1).toLowerCase() + this.constructorName.substring(1) + this.instanceIndex;
            }
        },
        instanceIndex: {
            get: function() {
                // console.log(this.constructorName + '#instanceIndex');
                if (this._instanceIndex) { return this._instanceIndex; }
                return this._instanceIndex = this.constructor.numInstances - 1; // numInstances is like Array.length
            }
        },
        toString: function() {
            // console.log(this.constructorName + '#toString');
            return '[' + this.typeName + ' ' + this.constructorName + ']';
        }
    });

    // This is only required for CoreObject because it's not created by a Parent.extend call.
    CoreObject.initNumInstances();

    return CoreObject;

});

/* ================================================================================================================== */
