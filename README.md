# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

[![Build Status](https://travis-ci.org/mysterycommand/palindromejs.png?branch=master)](https://travis-ci.org/mysterycommand/palindromejs)

Palindrome JS is an MVCVM framework … that's right, Model, View, Controller, ViewModel. Right now it's more concept than code, so the fact that there may also be Mediators, ViewControllers, a Router, Routes, Events, Collections, Adapters, Templates, and maybe even some kind Renderer doesn't bother me and it shouldn't bother you. I'll deal with whether or not the framework has palindrometric component initials when there's actual code in here.

## Introducing `CoreObject`!

[Problem No. 1: Inheritance](https://github.com/mysterycommand/palindromejs/wiki/Problem-No.-1:-Inheritance) — SOLVED!

#### Basic Usage:

```javascript
var Animal = CoreObject.extend(null, function(base) {
    return {
        // Naming your constructor will make toString actually meaningful.
        constructor: function Animal(instanceProps) {
            base.constructor.call(this, instanceProps);
        },
        speak: function() {
            console.log('Hi from', this.toString());
        }
    };
});
var animal = Animal.create();
animal.speak();                                 // Hi from [animal0 Animal] // <- meaningful, see?
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
            // The instanceDefaults getter is special. Properties of the object returned by this method
            // will be merged into any new instance. Be sure to call the base class's instanceDefaults.
            get: function() {
                // Calling `base.instanceDefaults` won't work here because of the usual this/context
                // problem. The `describe` method comes in handy. It's still kind-of wonky, but this
                // seems better than `Bird.prototype.describe('instanceDefaults').get.call(this)`.
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
penguin.speak();                                // Weird squawking noise from [penguin0 Penguin]
console.log(penguin.can('fly'));                // true // ... uh, yeah, that's a semantics problem
penguin.fly();                                  // I don't fly. Swim?
penguin.swim();                                 // Flap flap!
console.log('penguin.name:', penguin.name);     // penguin.name: Feathers McGraw
console.log('');

// Passing an object into the create call will override instanceDefaults.
var penguin1 = Penguin.create({ name: 'Chilly Willy' });
penguin1.speak();                               // Weird squawking noise from [penguin1 Penguin]
console.log('penguin1.name:', penguin1.name);   // penguin1.name: Chilly Willy
```

#### CoreObject Constructor Methods:

`CoreObject` has 3 static methods: `extend`, `create`, and `assign`. These methods are automatically copied over to it's 'subclasses' (that is, to constructor functions who's prototypes have CoreObject's prototype in their prototype chains … ugh, JavaScript). Let's look at them:

##### `extend(staticProps, protoFn)`
`CoreObject.extend` accepts two arguments, `staticProps` and `protoFn`, and returns a new constructor with the proper prototype chain wired up.

The first argument, `staticProps` is a plain object containing key value pairs. Values can be 'regular' JavaScript types (Array, Boolean, Date, Function, Number, Object, RegExp, or String) or property descriptors (either data descriptors or accessor descriptors). In either case the whole object is converted into an object of property descriptors that are mixed in with the super constructor's own properties, and then defined on the new constructor via [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties). By mixing in the super constructor's own properties, any constructor that inherits from `CoreObject` automatically gets the `extend`, `create`, and `assign` functionality.

The second argument, `protoFn` is a function that returns an object. The function is passed a reference to the super constructor's prototype, for use as a kind-of 'super' (though by my own convention it's called `base`). All of the properties of the object returned by this function are first converted into a property descriptors object and then copied onto the new constructor's prototype. The idea to pass the super constructor's prototype came from [LinkedIn's Fiber](https://github.com/linkedin/Fiber) library, and [DotNetWise's FastClass](https://github.com/dotnetwise/Javascript-FastClass) implementation of a similar concept. I haven't done performance tests (yet), but I'd guess that because of my implementation's reliance on `Object.create`, `Object.defineProperties`, `Object.defineProperty`, `Object.getOwnPropertyDescriptor`, and `Object.keys` (and maybe some other ES5 'native' methods) that mine's significantly slower ([not to mention completely incompatible with version of IE less than 9](http://kangax.github.io/es5-compat-table/)).

##### `create(instanceProps)`
`CoreObject.create` accepts a single argument, `instanceProps`, and returns a new instance the constructor from which it's called (remember that `create` is copied onto any subclass of `CoreObject`). At the moment, it's functionally equivalent to using `new CoreObject(instanceProps)`. However, use of `create` is encouraged, as it may be used later to provide additional funcitonality to the inheritance system.

The argument `instanceProps` is converted to a property descriptors object and then defined on the new instance via [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

##### `assign(/* ...sources */)`
`CoreObject.assign` accepts any number of sources, and returns a new object that is the accumulated own property descriptors of those sources. It's used mostly by the internals of the `extend` method, but also comes in handy when trying to access overridden getters and setters. For example, `CoreObject` has a spectial getter defined on it's prototype `instanceDefaults` that creates an instance id and name for any instance created from any subclass of `CoreObject`. It will sometimes be desireable to provide a constructor with it's own instance defaults, but also invoke the overridden getter. In the example below, `person.toString` is still useful because `CoreObject`'s instance defaults were inherited correctly:

```javascript
var Person = CoreObject.extend(null, function(base) {
    return {
        instanceDefaults: {
            get: function() {
                var inherited = base.describe('instanceDefaults').get.call(this);
                return Person.assign(inherited, { // <- assign is defined on all CoreObject subclasses
                    fname: 'John',
                    lname: 'Doe',
                    fullName: {
                        get: function() {
                            return this.fname + ' ' + this.lname;
                        }
                    }
                });
            }
        },
        constructor: function Person(instanceProps) {
            base.constructor.call(this, instanceProps);
        }
    };
});
var person = Person.create();
console.log(person.fullName, person.toString());    // John Doe [person0 Person]
console.log('');

var person1 = Person.create({ fname: 'Italo', lname: 'Calvino' });
console.log(person1.fullName, person1.toString());  // Italo Calvino [person1 Person]
console.log('');
```

#### Details (CoreObject Prototype Methods):

`CoreObject` has 5 methods, and 3 getters attached to it's prototype.
