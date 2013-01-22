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

        var obj = CoreObject.create();
        console.dir(obj);
        console.log(obj.name, obj.age);

        

        var Child = CoreObject.extend({
            name: 'test',
            constructor: function(name) {
                // this.name = name;
            }
        });
        var child = Child.create('child');
        
        console.dir(child);
        console.log(child instanceof Child && child instanceof CoreObject);
        console.log(child.name, child.age);

        

        var GrandChild = Child.extend({
            age: 12
        });
        var grandChild = GrandChild.create('grandChild');

        console.dir(grandChild);
        console.log(grandChild instanceof GrandChild && grandChild instanceof Child && grandChild instanceof CoreObject);
        console.log(grandChild.name, grandChild.age);
    }
);