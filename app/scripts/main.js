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

        // var Test = App.extend(null, function(base) {
        //     return {
        //         instanceDefaults: {
        //             get: function() {
        //                 var inherited = base.describe('instanceDefaults').get.call(this);
        //                 return Test.assign(inherited, {
        //                     _elementId: {
        //                         enumerable: false,
        //                         value: 'js-test'
        //                     },
        //                     _element: {
        //                         enumerable: false,
        //                         value: null
        //                     }
        //                 });
        //             }
        //         },
        //         constructor: function Test(instanceProps) {
        //             base.constructor.call(this, instanceProps);
        //         }
        //     };
        // });

        // var test = Test.create();
        // console.log(test.toString());

        // var test1 = Test.create();
        // console.log(test1.toString());
        // console.log(test1);

        // var Animal = CoreObject.extend(null, function(base) {
        //     return {
        //         constructor: function Animal() {
        //             base.constructor.call(this);
        //         },
        //         speak: function() {
        //             console.log('Hi from', this.toString());
        //         }
        //     };
        // });
        // var animal = Animal.create();
        // animal.speak(); // Hi from [animal0 Animal]

        // var Bird = Animal.extend(null, function(base) {
        //     return {
        //         constructor: function Bird() {
        //             base.constructor.call(this);
        //         },
        //         speak: function() {
        //             console.log('Chirp chirp from', this.toString());
        //         },
        //         fly: function() {
        //             console.log('Flap flap!');
        //         }
        //     };
        // });
        // var bird = Bird.create();
        // bird.speak(); // Chirp chirp from [bird0 Bird]
        // console.log(bird.can('fly')); // true
        // bird.fly(); // Flap flap!

        // var Penguin = Bird.extend(null, function(base) {
        //     return {
        //         instanceDefaults: {
        //             get: function() {
        //                 var inherited = base.describe('instanceDefaults').get.call(this);
        //                 return Penguin.assign(inherited, {
        //                     name: 'Feathers McGraw'
        //                 });
        //             }
        //         },
        //         constructor: function Penguin() {
        //             base.constructor.call(this);
        //         },
        //         speak: function() {
        //             console.log('Chirp chirp from', this.toString());
        //         },
        //         fly: function() {
        //             console.log('I don\'t fly. Swim?');
        //         },
        //         swim: function() {
        //             base.fly.call(this);
        //         }
        //     };
        // });
        // var penguin = Penguin.create();
        // penguin.speak(); // Chirp chirp from [penguin0 Penguin]
        // console.log(penguin.can('fly')); // true // ... uh, yeah, that's a semantics problem
        // penguin.fly(); // I don't fly. Swim?
        // penguin.swim(); // Flap flap!
    });
});

/* ================================================================================================================== */
