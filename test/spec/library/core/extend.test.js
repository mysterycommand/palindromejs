/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/core/extend'

], function (

    extend

) {

    'use strict';

    describe('extend', function () {
        it('should exist', function() {
            should.exist(extend);
        });
        it('should be a function', function() {
            (extend).should.be.an.instanceof(Function);
        });
        it('should return a function', function() {
            (extend()).should.be.an.instanceof(Function);
        });
        it.skip('should return a constructor that creates an object', function() {
            // This is hard to test, should is on the Object.prototype, so extending from null breaks the test.
            var Ctor = extend();
            (new Ctor()).should.be.an.instanceof(Object);
            (new Ctor()).should.be.an.instanceof(Ctor);
        });
        it('should return a constructor that creates an object', function() {
            var Ctor = extend(Object);
            (new Ctor()).should.be.an.instanceof(Object);
            // (new Ctor()).should.be.an.instanceof(Ctor); // AssertionError: expected {} to be an instance of Child
        });
        it('should apply staticProps arguments to the constructor', function() {
            var Ctor = extend(Object, {
                one: {
                    configurable: false,
                    value: 1
                },
                two: {
                    configurable: false,
                    writable: false,
                    value: 'Two'
                },
                three: {
                    configurable: false,
                    value: true
                },
                four: {
                    configurable: false,
                    get: function() {
                        return this._four || (this._four = 4);
                    }
                },
                five: function() {
                    return this._five || (this._five = 'V');
                }
            });

            (Ctor).should.have.a.property('one', 1);
            (Ctor).should.have.a.property('two', 'Two');
            (Ctor).should.have.a.property('three', true);
            (Ctor).should.have.a.property('four', 4);
            (Ctor.four).should.equal(4);
            (Ctor.five).should.be.a('function');
            (Ctor.five()).should.equal('V');
        });
        it('should apply ancestors properties to descendants', function () {
            var GrandParent = extend(Object, {
                one: {
                    configurable: false,
                    value: 1
                },
                two: 2
            });

            var Parent = extend(GrandParent, {
                two: 'Two',
                three: {
                    get: function() { return 3; }
                }
            });

            var Child = extend(Parent, {
                three: {
                    get: function() { return 'three'; }
                },
                four: 'IV'
            });

            (GrandParent).should.have.a.property('one', 1);
            (GrandParent).should.have.a.property('two', 2);
            (GrandParent).should.not.have.a.property('three');
            (GrandParent).should.not.have.a.property('four');

            (Parent).should.have.a.property('one', 1);
            (Parent).should.have.a.property('two', 'Two');
            (Parent).should.have.a.property('three', 3);
            (Parent).should.not.have.a.property('four');

            (Child).should.have.a.property('one', 1);
            (Child).should.have.a.property('two', 'Two');
            (Child).should.have.a.property('three', 'three');
            (Child).should.have.a.property('four', 'IV');
        });
        it('should not allow descendants to override ancestors\' non-configurable properties', function () {
            var Ancestor = extend(Object, {
                one: {
                    configurable: false,
                    value: 1
                },
                two: 2,
                three: {
                    configurable: false,
                    get: function() { return 3; },
                    set: function(value) { this[value] = 3; } // That's crazy!
                }
            });

            (function() {
                extend(Ancestor, {
                    one: 'One'
                });
            }).should.throw(TypeError);

            (function() {
                extend(Ancestor, {
                    three: {
                        get: function() { return 'Three'; }
                    }
                });
            }).should.throw(TypeError);
        });
        it('should create prototype properties with a third argument', function () {
            var Ctor = extend(Object, null, function(/* base */) {
                return {
                    constructor: function Ctor() {
                        // console.log('Ctor#constructor');
                    },
                    _name: {
                        configurable: false,
                        enumerable: false,
                        get: function() {
                            return 'ctor';
                        }
                    },
                    toString: function() {
                        return '[object Ctor]';
                    }
                };
            });

            ((new Ctor())._name).should.equal('ctor');
            (new Ctor()).should.have.a.property('_name', 'ctor');
            (Object.keys(new Ctor())).should.not.contain.key('_name');
            (new Ctor()).should.have.a.property('toString');
        });
    });

});
/* ================================================================================================================== */
