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
        console.log(obj.name, obj.age); // undefined undefined



        var Child = CoreObject.extend({
            name: 'child',
            constructor: function(name) {
                console.log('Hello from ' + name + '.');
            },
            laugh: function() {
                console.log('Hahahah!');
            }
        });
        var child = Child.create('Charlie'); // Hello from Charlie.

        console.dir(child);
        console.log(child instanceof Child && child instanceof CoreObject); // true
        console.log(child.name, child.age); // child undefined
        child.laugh(); // Hahahah!
        // child.giggle(); // TypeError!



        var GrandChild = Child.extend({
            name: 'grandChild',
            age: 12,
            giggle: function() {
                console.log('Teehee!');
            }
        });
        var grandChild = GrandChild.create('Esther'); // Hello from Esther.

        console.dir(grandChild);
        console.log(grandChild instanceof GrandChild && grandChild instanceof Child && grandChild instanceof CoreObject); // true
        console.log(grandChild.name, grandChild.age); // grandChild 12
        grandChild.laugh(); // Hahahah!
        grandChild.giggle(); // Teehee!
    }
);