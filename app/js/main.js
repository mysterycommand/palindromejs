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
        grandChild.name = 'greatGrandChild';

        console.dir(grandChild);
        console.log(grandChild instanceof GrandChild && grandChild instanceof Child && grandChild instanceof CoreObject); // true
        console.log(grandChild.name, grandChild.age); // grandChild 12
        grandChild.laugh(); // Hahahah!
        grandChild.giggle(); // Teehee!



        var FancyObject = CoreObject.extend({

            _secret: 'Shhh!',
            _readOnly: 'No changing.',
            _writeOnly: '',
            _superSecret: 'No really … shhh!',

            publicProperty: 12345,
            
            constructor: function() {
                console.log('Hello fancy!');
                console.dir(this);
            },
            
            getSecret: function() {
                return this._secret;
            },

            setSecret: function(value) {
                this._secret = value;
            },
            
            getReadOnly: function () {
                return 'The value of _readOnly is: ' + this._readOnly;
            },
            
            setWriteOnly: function (value) {
                console.log('Setting _writeOnly to: ' + value);
                this._writeOnly = value;
            },

            getOtherProperty: function() {
                return this._otherProperty;
            },
            
            regularMethod: function() {
                console.log('I\'m doing something!');
            },
            
            accessPrivateProperties: function() {
                console.log('I\'m whispering! ' + this._superSecret);
            }
        });
        var fancy = FancyObject.create();

        console.dir(fancy);

        console.log(fancy.secret);
        fancy.secret = 'Whispers!';
        console.log(fancy.secret);
        
        console.log(fancy.readOnly);
        fancy.writeOnly = 'I don\'t know why you\'d use this.';
        console.log(fancy.otherProperty);

        fancy.regularMethod();
        
        fancy.accessPrivateProperties();
        
        console.log(fancy._secret);
        console.log(fancy._readOnly);
        console.log(fancy._writeOnly);
        console.log(fancy._superSecret);

        fancy._secret = 'test';
        fancy._readOnly = 'test';
        fancy._writeOnly = 'test';
        fancy._superSecret = 'test';
        
        console.log(fancy._secret);
        console.log(fancy._readOnly);
        console.log(fancy._writeOnly);
        console.log(fancy._superSecret);
    }
);
