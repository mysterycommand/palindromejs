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

    'library/core/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    var App = CoreObject.extend({
        VERSION: {
            configurable: false,
            value: '0.0.1',
            writable: false
        }
    }, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return App.assign(inherited, {
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
            constructor: function App(instanceProps) {
                base.constructor.call(this, instanceProps);
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
        };
    });

    return App;

});

/* ================================================================================================================== */
