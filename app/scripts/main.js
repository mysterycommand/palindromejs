/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/* ================================================================================================================== */

require([

    'jquery',
    'library/core/CoreObject',
    'App'

], function (

    $,
    CoreObject,
    App

) {

    'use strict';
    if (window.$) { window.$.noConflict(); }
    if (window.jQuery) { window.jQuery.noConflict(); }
    // if (window._) { window._.noConflict(); }

    $(function() {
        var app = App.create();
        // console.log(app.toString());

        var Animal = CoreObject.extend(null, function(base) {
            return {
                constructor: function Animal(instanceProps) {
                    base.constructor.call(this, instanceProps);
                },
                speak: function() {
                    console.log('Hi from', this.toString());
                }
            };
        });
        var animal = Animal.create();
        animal.speak();                                 // Hi from [animal0 Animal]
        console.log('');

        var Bird = Animal.extend(null, function(base) {
            return {
                constructor: function Bird(instanceProps) {
                    base.constructor.call(this, instanceProps);
                },
                speak: function() {
                    console.log('Chirp chirp from', this.toString());
                },
                fly: function() {
                    console.log('Flap flap!');
                }
            };
        });
        var bird = Bird.create();
        bird.speak();                                   // Chirp chirp from [bird0 Bird]
        console.log(bird.can('fly'));                   // true
        bird.fly();                                     // Flap flap!
        console.log('');

        var Penguin = Bird.extend(null, function(base) {
            return {
                instanceDefaults: {
                    // The instanceDefaults 'getter' is a special property of CoreObject. The object returned from this
                    // method will be merged into any new instance. Be sure to call the base class's instanceDefaults
                    // though. CoreObject uses it to create a unique id and name for instances of it's subclasses.
                    get: function() {
                        // Calling the "super" of a 'getter' method is kind-of wonky in JavaScript, but this is
                        // far better than what I started out with ... aaahhh JavaScript.
                        var inherited = base.describe('instanceDefaults').get.call(this);
                        return Penguin.assign(inherited, {
                            name: 'Feathers McGraw'
                        });
                    }
                },
                constructor: function Penguin(instanceProps) {
                    base.constructor.call(this, instanceProps);
                },
                speak: function() {
                    console.log('Weird squawking noise from', this.toString());
                },
                fly: function() {
                    console.log('I don\'t fly. Swim?');
                },
                swim: function() {
                    base.fly.call(this);
                }
            };
        });
        var penguin = Penguin.create();
        penguin.speak();                                // Chirp chirp from [penguin0 Penguin]
        console.log(penguin.can('fly'));                // true // ... uh, yeah, that's a semantics problem
        penguin.fly();                                  // I don't fly. Swim?
        penguin.swim();                                 // Flap flap!
        console.log('penguin.name:', penguin.name);     // penguin.name: Feathers McGraw
        console.log('');

        // Passing an object into the create call will override instanceDefaults.
        var penguin1 = Penguin.create({ name: 'Chilly Willy' });
        penguin1.speak();                               // Chirp chirp from [penguin1 Penguin]
        console.log('penguin1.name:', penguin1.name);   // penguin1.name: Chilly Willy
    });
});

/* ================================================================================================================== */
