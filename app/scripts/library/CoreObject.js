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
            const: true,
            value: function(props) {
                // console.log('CoreObject#extend', arguments);
                var Child = extend(this, props);

                Child.extend = CoreObject.extend;
                Child.create = CoreObject.create;

                return Child;
            }
        },
        create: {
            static: true,
            const: true,
            value: function() {
                // console.log('CoreObject#create', arguments);
                var This = this;
                return new This(arguments);
            }
        },
        constructor: function CoreObject() {
            // console.log('CoreObject#constructor');
            this.toString();
        },
        toString: function() {
            // console.log('CoreObject#toString');
            this._type = this._type || typeof this;
            this._ctor = this._ctor || this.constructor.toString().match(/function\s*(\w+)/)[1];
            return '[' + this._type + ' ' + this._ctor + ']';
        }
    });

    return CoreObject;

});

/* ================================================================================================================== */
