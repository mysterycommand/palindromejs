# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

Palindrome JS is an MVCVM framework … that's right, Model, View, Controller, ViewModel. Right now it's more concept than code, so the fact that there may also be Mediators, ViewControllers, a Router, Routes, Events, Collections, Adapters, Templates, and maybe even some kind Renderer doesn't bother me and it shouldn't bother you. I'll deal with whether or not the framework has palindrometric component initials when there's actual code in here.

## Problem No. 1: Inheritance

There are a lot of ways to do inheritance in JavaScript, but all of the good articles I can find seem really old:

* Dean Edwards' [Base](http://dean.edwards.name/weblog/2006/03/base/) (March 2006)
* Alex Arnell's [Prototype: Inheritance Madness](http://alternateidea.com/blog/articles/2006/05/23/prototype-inheritance-madness) (May 2006)
    * Updated by the Prototype library: [Defining classes and inheritance](http://prototypejs.org/learn/class-inheritance) (October 2007)
* John Resig's [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) (March 2008)
* … but the new sexy is [Object.create](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create)

This stuff has been implemented in various ways by a lot of MV\* frameworks, and here's what I've found of those:

* [Prototype 1.7.1](https://github.com/sstephenson/prototype/blob/1.7.1/src/prototype/lang/class.js#L1)
* [Backbone 0.9.10](https://github.com/documentcloud/backbone/blob/0.9.10/backbone.js#L234)
* [Spine 1.0.8](https://github.com/maccman/spine/blob/v1.0.8/lib/spine.js#L95)
* [Ember 1.0.0-pre.4](https://github.com/emberjs/ember.js/blob/v1.0.0-pre.4/packages/ember-runtime/lib/system/core_object.js#L337)
    * This is maybe the closest to what I want as it looks like it's using the ES5 Object.create functionality, but for my taste/use it seems overcomplicated.

Also, not sure if these count, but inheritance (or at least the notion of object extension) is sort of addressed by these utility libraries:

* [Lodash 1.0.0-rc.3](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/lodash.js#L813)
* [Underscore 1.4.3](https://github.com/documentcloud/underscore/blob/1.4.3/underscore.js#L763)

Looks like ES.next means _whatever_ next version of ECMAScript (and will mean that into the future), ES 6 means the _current_ next version of ECMAScript (because we're currently on version 5 [or I guess technically 5.1]), and ES Harmony is ES.next + more features that may or may not be included in whatever version ES.next points to. See [ECMAScript: ES.next versus ES 6 versus ES Harmony](http://www.2ality.com/2011/06/ecmascript.html) for more on ES history.

Anyway, it [looks like](http://wiki.ecmascript.org/doku.php?id=harmony:classes) 'class literals' have been accepted into the ES 6 proposal (not yet a standard or recomendation, but hey) … and here's another update paraphrased from Brendon Eich at TXJS two years ago: [ECMAScript.next: the “TXJS” update by Eich](http://www.2ality.com/2011/06/esnext-txjs.html). Here's some more good info that's only 6 months old: [Classes in JavaScript ES6](http://h3manth.com/content/classes-javascript-es6), and here's some info from Brendan Eich himself that seems to only be 7 months old (from a talk given with CoffeeScript's Jeremy Ashkenas): [CoffeeScript as a JS/next](http://brendaneich.com/tag/javascript-ecmascript-harmony-coffeescript/).

### So, what do I want anyway?

Somethin like:

```javascript
var MySuperClass = Extensible.extend({
    someProperty: true,

    constructor: function() {
        console.log(this.someProperty);
    },

    someMethod: function() {
        console.log(this.someProperty);
    }
});

var MyClass = MySuperClass.extend({
    someOtherProperty: 42,

    constructor: function(someArgument) {
        this._super();
        this.someProperty = someArgument;
        console.log(this.someProperty);
    },
    
    someMethod: function() {
        this._super(); // or maybe this._super.someMethod();
        console.log(this.someProperty);
    },
    
    someOtherMethod: function() {
        console.log(this.someOtherProperty);
    }
});

var mySuperInstance = MySuperClass.create();
// true

mySuperInstance.someMethod();
// true

var myInstance = MyClass.create(false);
// true
// false

myInstance.someMethod();
// true
// false

myInstance.someOtherMethod();
// 42
```

… er something like that. Man, this is going to be a good test of my assumptions about a lot of low level inheritance stuff that I just take for granted. :)