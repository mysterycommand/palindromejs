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
            // console.log(this.constructorName + '#constructor', arguments);
            // CoreObject.call(this);
        }
    });

    return App;

});

/* ================================================================================================================== */
