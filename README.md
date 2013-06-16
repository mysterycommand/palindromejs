# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

[![Build Status](https://travis-ci.org/mysterycommand/palindromejs.png?branch=master)](https://travis-ci.org/mysterycommand/palindromejs)

Palindrome JS is an MVCVM framework … that's right, Model, View, Controller, ViewModel. Right now it's more concept than code, so the fact that there may also be Mediators, ViewControllers, a Router, Routes, Events, Collections, Adapters, Templates, and maybe even some kind Renderer doesn't bother me and it shouldn't bother you. I'll deal with whether or not the framework has palindrometric component initials when there's actual code in here.

## Introducing `CoreObject`!

[Problem No. 1: Inheritance](https://github.com/mysterycommand/palindromejs/wiki/Problem-No.-1:-Inheritance) — SOLVED! Basics:

```javascript
var Animal = CoreObject.extend(null, function(base) {
    return {
        constructor: function Animal() {
            base.constructor.call(this);
        },
        speak: function() {
            console.log('Hi from', this.toString());
        }
    };
});
var animal = Animal.create();
animal.speak(); // Hi from [animal0 Animal]

var Bird = Animal.extend(null, function(base) {
    return {
        constructor: function Bird() {
            base.constructor.call(this);
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
bird.speak(); // Chirp chirp from [bird0 Bird]
console.log(bird.can('fly')); // true
bird.fly(); // Flap flap!

var Penguin = Bird.extend(null, function(base) {
    return {
        instanceDefaults: {
            get: function() {
                var inherited = base.describe('instanceDefaults').get.call(this);
                return Penguin.assign(inherited, {
                    name: 'Feathers McGraw'
                });
            }
        },
        constructor: function Penguin() {
            base.constructor.call(this);
        },
        speak: function() {
            console.log('Chirp chirp from', this.toString());
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
penguin.speak(); // Chirp chirp from [penguin0 Penguin]
console.log(penguin.can('fly')); // true // ... uh, yeah, that's a semantics problem
penguin.fly(); // I don't fly. Swim?
penguin.swim(); // Flap flap!
```
