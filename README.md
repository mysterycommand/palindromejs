# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

[![Build Status](https://travis-ci.org/mysterycommand/palindromejs.png)](https://travis-ci.org/mysterycommand/palindromejs)

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

Something like:

```javascript
var obj = CoreObject.create();
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

console.log(child instanceof Child && child instanceof CoreObject); // true
console.log(child.name, child.age); // child undefined
child.laugh(); // Hahahah!
child.giggle(); // TypeError!

var GrandChild = Child.extend({
    name: 'grandChild',
    age: 12,
    giggle: function() {
        console.log('Teehee!');
    }
});
var grandChild = GrandChild.create('Esther'); // Hello from Esther.

console.log(grandChild instanceof GrandChild && grandChild instanceof Child && grandChild instanceof CoreObject); // true
console.log(grandChild.name, grandChild.age); // grandChild 12
grandChild.laugh(); // Hahahah!
grandChild.giggle(); // Teehee!
```

Okay, so after much discussion, and trial and error, I think I'm close to something with this above (also [here](https://github.com/mysterycommand/palindromejs/blob/master/app/js/main.js)). It's largely based on [Simple JavaScript Inheritance with Backbone](http://blog.usefunnel.com/2011/03/js-inheritance-with-backbone/) (March 2011) and the [js-toolbox](https://github.com/jimmydo/js-toolbox) project.

I'm still not super confident, and I'm not at all sure how I'd set up tests to reassure myself … but I think this is the right road … the road to the future. We're still going to use `new` to instantiate objects as `new` appears [drastically faster](http://jsperf.com/object-create-vs-constructor-vs-object-literal/7) than `Object.create` (though I may still add a `CoreObject#create` method in the interest of lexical consistency).

I also found this [Jay](https://github.com/incrementalco/jay) library's [typing](https://github.com/incrementalco/jay/blob/master/src/typing.js) stuff handy in thinking through some of the issues.

And this [discussion of inheritence](https://github.com/jashkenas/coffee-script/issues/242) and `class` in CoffeeScript has lots of great info, including links to [Class Warfare: Classes vs. Prototypes](http://www.laputan.org/reflection/warfare.html) and [The Early History of Smalltalk](http://jashkenas.s3.amazonaws.com/misc/Smallhistory.pdf).

Also found [JavaScript object creation: Learning to live without "new"](http://www.adobe.com/devnet/html5/articles/javascript-object-creation.html) from February 2012. It's doing something similar, but I'd like to keep 'new' for object creation for reason noted above.

### CoreObject!

I used `Object.create`'s `defineProperties`, and property descriptors to automatically generate getters and/or setters for functions and stuff … it's cool, but I'm pretty tired right now.

### Tests! Continuous Integration!

You should be able to run:
```
git clone https://github.com/mysterycommand/palindromejs.git
cd palindromejs
npm install
mocha-phantomjs test/index.html
```

… and, at the moment, get one test pass 'CoreObject should exist.'.
