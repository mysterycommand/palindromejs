/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint newcap: false */

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

                // var This = this;
                // This.incNumInstances();
                // var instance = new This(arguments);
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

                // var This = this;
                // Object.defineProperty(This, '_numInstances', {
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

                // var This = this;
                // return This._numInstances || (This._numInstances = 0);
                return this._numInstances;
            }
        },
        incNumInstances: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#incNumInstances', arguments);

                // var This = this;
                // This._numInstances = This.numInstances + 1;
                this._numInstances = this.numInstances + 1;
            }
        },
        decNumInstances: {
            static: true,
            value: function() {
                // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#decNumInstances', arguments);

                // var This = this;
                // This._numInstances = This.numInstances - 1;
                this._numInstances = this.numInstances - 1;
            }
        },
        constructor: function CoreObject() {
            // console.log('CoreObject#constructor');
        },
        destroy: function() {
            // console.log(this.toString().match(/function\s*(\w+)/)[1] + '#destroy', arguments);

            // var This = this.constructor;
            // This.decNumInstances();
            this.constructor.decNumInstances();
            return this;
        },
        typeName: {
            get: function() {
                // console.log(this.constructorName + '#typeName');
                if (this._type) { return this._type; }

                this._type = typeof this;
                return this._type;
            }
        },
        constructorName: {
            get: function() {
                // console.log(this.constructorName + '#constructorName');
                if (this._name) { return this._name; }

                // var This = this.constructor;
                // This.toString().match(/function\s*(\w+)/)[1];
                this._ctor = this.constructor.toString().match(/function\s*(\w+)/)[1];
                return this._ctor;
            }
        },
        instanceName: {
            get: function() {
                // console.log(this.constructorName + '#instanceName');
                if (this._name) { return this._name; }

                var ctor = this.constructorName;
                this._name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1) + this.instanceIndex;

                return this._name;
            }
        },
        instanceIndex: {
            get: function() {
                // console.log(this.constructorName + '#instanceIndex');
                if (this._instanceIndex) { return this._instanceIndex; }

                this._instanceIndex = this.constructor.numInstances - 1; // numInstances is like Array.length
                return this._instanceIndex;
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
