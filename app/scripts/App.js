/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

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
                var inherited = Object.getOwnPropertyDescriptor(CoreObject.prototype, 'instanceDefaults').get.call(this);
                return CoreObject.assign({
                    _elementId: {
                        configurable: false,
                        enumerable: false,
                        value: 'js-app'
                    },
                    _element: {
                        configurable: false,
                        enumerable: false,
                        value: null
                    }
                }, inherited);
            }
        },
        constructor: function App() {
            CoreObject.apply(this, arguments);
        },
        elementId: {
            get: function() {
                return this._elementId || (this._elementId = this._element.getAttribute('id'));
            },
            set: function(value) {
                this._element.setAttribute('id', value);
                this._elementId = value;
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
