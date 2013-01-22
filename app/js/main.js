/** ====================================================================================================== **/
/**
 * @fileOverview
 * The main application entry point.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
        'jquery',
        'lodash',
        'lib/CoreObject'
    ],
    function(
        $,
        _,
        CoreObject
    ) {
        'use strict';

        var Child = CoreObject.extend({
            name: '',
            constructor: function(name) {
                this.name = name;
            }
        });
        var child = Child.create('child');

        var GrandChild = Child.extend();
        var grandChild = GrandChild.create('grandChild');

        console.dir(CoreObject.create());
        
        console.dir(child);
        console.log(child instanceof Child && child instanceof CoreObject);

        console.dir(grandChild);
        console.log(grandChild instanceof GrandChild && grandChild instanceof Child && grandChild instanceof CoreObject);
    }
);