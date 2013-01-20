# [Palindrome](http://en.wikipedia.org/wiki/Palindrome) JS

Palindrome JS is an MVCVM framework … that's right, Model, View, Controller, ViewModel. Right now it's more concept than code, so the fact that there may also be Mediators, ViewControllers, a Router, Routes, Events, Collections, Adapters, Templates, and maybe even some kind Renderer doesn't bother me and it shouldn't bother you. I'll deal with whether or not the framework has palindrometric component initials when there's actual code in here.

## Problem No. 1: Inheritance

There are a lot of ways to do inheritance in JavaScript, but all of the good articles I can find seem really old:

* Dean Edwards' [Base](http://dean.edwards.name/weblog/2006/03/base/) (March 2006)
* Alex Arnell's [Prototype: Inheritance Madness](http://alternateidea.com/blog/articles/2006/05/23/prototype-inheritance-madness) (May 2006)
    * Updated by the Prototype library: [Defining classes and inheritance](http://prototypejs.org/learn/class-inheritance) (October 2007)
* John Resig's [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) (March 2008)
* … but the new sexy is [Object.create](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create)

This stuff has been implemented in various ways by a lot of MV* frameworks, and here's what I've found of those:

* [Prototype 1.7.1](https://github.com/sstephenson/prototype/blob/1.7.1/src/prototype/lang/class.js#L1)
* [Backbone 0.9.10](https://github.com/documentcloud/backbone/blob/0.9.10/backbone.js#L234)
* [Spine 1.0.8](https://github.com/maccman/spine/blob/v1.0.8/lib/spine.js#L95)
* [Ember 1.0.0-pre.4](https://github.com/emberjs/ember.js/blob/v1.0.0-pre.4/packages/ember-runtime/lib/system/core_object.js#L337)

Also, not sure if these count, but it's sort of addressed by these utility libraries:

* [Lodash 1.0.0-rc.3](https://github.com/bestiejs/lodash/blob/v1.0.0-rc.3/lodash.js#L813)
* [Underscore 1.4.3](https://github.com/documentcloud/underscore/blob/1.4.3/underscore.js#L763)

Also, not sure if there's any inheritance work being done in ES6/Next/Harmony (jeez, consolidate yer brand guys).