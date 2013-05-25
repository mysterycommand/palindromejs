/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

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

                var This = this;
                This.incNumInstances();
                var instance = new This(arguments);
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
        constructor: function CoreObject() {
            // console.log('CoreObject#constructor');
        },
        typeName: {
            get: function() {
                if (this._type) { return this._type; }

                this._type = typeof this;
                return this._type;
            }
        },
        constructorName: {
            get: function() {
                if (this._name) { return this._name; }

                this._ctor = this.constructor.toString().match(/function\s*(\w+)/)[1];
                return this._ctor;
            }
        },
        instanceName: {
            get: function() {
                if (this._name) { return this._name; }

                this.uniqueId = this.constructor.numInstances - 1; // numInstances is like Array.length

                var ctor = this.constructorName;
                this._name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1) + this.uniqueId;

                return this._name;
            }
        },
        uniqueId: {
            get: function() {
                if (this._name) { return this._name; }
                return this._uniqueId;
            }
        },
        toString: function() {
            // console.log('CoreObject#toString');
            return '[' + this.typeName + ' ' + this.constructorName + ']';
        }
    });

    // This is only required for CoreObject because it's not created by a Parent.extend call.
    CoreObject.initNumInstances();

    return CoreObject;

});

/* ================================================================================================================== */
