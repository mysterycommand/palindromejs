/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true */

define([

    'library/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    var App = CoreObject.extend(null, {
        instanceDefaults: {
            get: function() {
                // TODO: eww ...
                var inherited = CoreObject.prototype.describe('instanceDefaults').get.call(this);
                // var inherited = this.super('instanceDefaults');
                return CoreObject.assign(inherited, {
                    _elementId: {
                        enumerable: false,
                        value: 'js-app'
                    },
                    _element: {
                        enumerable: false,
                        value: null
                    }
                });
            }
        },
        constructor: function App() {
            CoreObject.apply(this, arguments);
        },
        elementId: {
            get: function() {
                if (this._elementId) { return this._elementId; }
                this._elementId = (this._element)
                    ? this._element.getAttribute('id')
                    : '';
                return this._elementId;
            },
            set: function(value) {
                if (this._elementId === value) { return; }
                this._elementId = value;

                if (this._element) {
                    this._element.setAttribute('id', this._elementId);
                }
            }
        },
        element: {
            get: function() {
                return this._element || (this._element = document.getElementById(this.elementId));
            },
            set: function(value) {
                var id = value.getAttribute('id');

                if (id) {
                    this._elementId = id;
                } else {
                    value.setAttribute('id', this._elementId);
                }

                this._element = value;
            }
        }
    });

    return App;

});

/* ================================================================================================================== */
