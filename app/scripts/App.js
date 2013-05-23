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

    var App = CoreObject.extend({
        constructor: function App() {
            CoreObject.prototype.constructor.call(this);
        }
    });

    return App;

});

/* ================================================================================================================== */
