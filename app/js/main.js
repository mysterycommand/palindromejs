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

        var core = CoreObject.create();
        console.log(core);

        var Person = CoreObject.extend({
            get: {
                name: function() {
                    return [
                        this._fname,
                        this._mname,
                        this._lname
                    ].join(' ');
                },
                age: function() {
                    return this._age;
                }
            },
            set: {
                age: function(value) {
                    this._age = value;
                }
            },
            constructor: function Person(options) {
                this._age = 0;
                this._fname = options.fname;
                this._mname = options.mname;
                this._lname = options.lname;
            }
        });

        var Parent = Person.extend({
            get: {
                numChildren: function() {
                    return this._children.length;
                }
            },

            constructor: function Parent(options) {
                Person.call(this, options);
                this._children = [];
            },

            addChild: function() {
                this._children.push(this.numChildren);
            }
        });

        var father = Parent.create({
            fname: 'Michael',
            mname: 'Edward',
            lname: 'Hayes'
        });

        console.log(father);
        console.log(father.name);
        console.log(father.age);
        console.log(father.numChildren);

        father.addChild();
        father.addChild();
        father.addChild();
        father.age = 60;

        console.log(father.age);
        console.log(father.numChildren);
        console.log(father instanceof Parent && father instanceof Person && father instanceof CoreObject);
        console.log(father.toString());

        var EventDispatcher = CoreObject.extend({
            constructor: function EventDispatcher(options) {
                this.target = options.target || this;
            },
            
            addEventListener: function(type, listener/*, useCapture, priority, useWeakReverence */) {
                console.log(type);
            },
            
            dispatchEvent: function(event) {
                console.log(event.type);
                return false;
            },
            
            hasEventListener: function(type) {
                return false;
            },
            
            removeEventListener: function(type, listener/*, useCapture */) {
                console.log(type);
            },

            willTrigger: function(type) {
                return false;
            }
        });

        var Event = CoreObject.extend({
            static: {
                const: {
                    CREATE: 'eventCreate',
                    UPDATE: 'eventUpdate',
                    RENDER: 'eventRender',
                    DELETE: 'eventDelete'
                }
            },
            
            get: {
                bubbles: function() { return this._bubbles; },
                cancelable: function() { return this._cancelable; },
                currentTarget: function() { return this._currentTarget; },
                eventPhase: function() { return this._eventPhase; },
                target: function() { return this._target; },
                type: function() { return this._type; },
            },
            
            constructor: function Event(options) {
                this._type = options.type;
                this._bubbles = options.bubbles || false;
                this._cancelable = options.cancelable || false;
            },

            clone: function() {
                return Event.create({
                    type: this.type,
                    bubbles: this.bubbles,
                    cancelable: this.cancelable
                });
            },

            isDefaultPrevented: function() { return false; },
            preventDefault: function() {},
            stopImmediatePropagation: function() {},
            stopPropagation: function() {}
        });
    }
);
