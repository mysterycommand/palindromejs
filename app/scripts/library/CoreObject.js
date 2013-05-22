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
                console.log('CoreObject#extend', arguments);
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
                console.log('CoreObject#create', arguments);
                var This = this;
                return new This(arguments);
            }
        },
        constructor: function CoreObject() {
            console.log('CoreObject#constructor');
        },
        toString: {
            value: function() {
            }
        }
    });

    return CoreObject;

});

/* ================================================================================================================== */
