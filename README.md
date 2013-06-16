# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

[![Build Status](https://travis-ci.org/mysterycommand/palindromejs.png?branch=master)](https://travis-ci.org/mysterycommand/palindromejs)

Palindrome JS is an MVCVM framework … that's right, Model, View, Controller, ViewModel. Right now it's more concept than code, so the fact that there may also be Mediators, ViewControllers, a Router, Routes, Events, Collections, Adapters, Templates, and maybe even some kind Renderer doesn't bother me and it shouldn't bother you. I'll deal with whether or not the framework has palindrometric component initials when there's actual code in here.

## Problem No. 1: Inheritance — SOLVED!
## Introducing `CoreObject`!

Basics:

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
            console.log('Squak from', this.toString());
        },
        fly: function() {
            console.log('Flap flap!');
        }
    };
});
var bird = Bird.create();
bird.speak(); // Squak from [bird0 Bird]
console.log(bird.can('fly')); // true
```
