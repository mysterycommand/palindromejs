/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/descriptors/assignDescriptors'

], function (

    assignDescriptors

) {

    'use strict';

    describe('assignDescriptors', function () {
        it('should exist', function() {
            should.exist(assignDescriptors);
        });
        it('should be a function', function() {
            (assignDescriptors).should.be.an.instanceof(Function);
        });
        it('should return an object', function() {
            (assignDescriptors()).should.be.an.instanceof(Object);
        });
        it('should affect the target', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};
            Object.defineProperties(target, assignDescriptors(source1, source2, source3));

            (target).should.have.a.property('one', true);
            (target).should.have.a.property('two', true);
            (target).should.have.a.property('three', true);
        });
        it('should work with 1 or 2 arguments too', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};

            (Object.defineProperties(target, assignDescriptors(source1))).should.have.a.property('one', true);
            (Object.defineProperties(target, assignDescriptors(source1, source2))).should.have.a.property('one', true);
            (Object.defineProperties(target, assignDescriptors(source1, source2))).should.have.a.property('two', true);
        });
        it('should not affect the sources', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};
            Object.defineProperties(target, assignDescriptors(source1, source2, source3));

            (source1).should.not.have.a.property('two');
            (source1).should.not.have.a.property('three');
            (source2).should.not.have.a.property('one');
            (source2).should.not.have.a.property('three');
            (source3).should.not.have.a.property('one');
            (source3).should.not.have.a.property('two');
        });
        it('later arguments should override prior arguments', function () {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {two: false, three: true};
            Object.defineProperties(target, assignDescriptors(source1, source2, source3));

            (target).should.have.a.property('one', true);
            (target).should.have.a.property('two', false);
            (target).should.have.a.property('three', true);
        });
        it('should skip over falsey arguments', function () {
            var target = {};
            var source1 = {one: 1};
            var source2 = {two: true};
            var source3 = {two: 'Two', three: true};

            (function() {
                assignDescriptors(source1, null, source3);
            }).should.not.throw(TypeError);

            (function() {
                assignDescriptors(source1, false, source3);
            }).should.not.throw(TypeError);

            (function() {
                assignDescriptors(source1, undefined, source3);
            }).should.not.throw(TypeError);

            (function() {
                assignDescriptors(source1, '', source3);
            }).should.not.throw(TypeError);

            (function() {
                assignDescriptors(source1, 0, source3);
            }).should.not.throw(TypeError);

            Object.defineProperties(target, assignDescriptors(source1, {}, source3));

            (target).should.have.a.property('one', 1);
            (target).should.have.a.property('two', 'Two');
            (target).should.have.a.property('three', true);
        });
        it('should accept raw property descriptors', function () {
            var target = {};
            var source1 = {one: true};
            var source2 = {
                two: {
                    configurable: true,
                    value: true
                },
                four: {
                    configurable: false,
                    get: function() { return 4; }
                }
            };
            var source3 = {two: false, three: true};
            Object.defineProperties(target, assignDescriptors(source1, source2, source3));

            (target).should.have.a.property('one', true);
            (target).should.have.a.property('two', false);
            (target).should.have.a.property('three', true);
            (target).should.have.a.property('four', 4);
        });
        it('should respect property descriptors\' configurable value', function () {
            var target = {};
            var source1 = {one: 1};
            var source2 = {
                two: {
                    configurable: false,
                    value: 2
                }
            };
            var source3 = {two: 'Two', three: 3};

            (function() {
                assignDescriptors(source1, source2, source3);
            }).should.throw(TypeError);
        });
        it('should respect property descriptors\' writable value', function () {
            var target = {};
            var source1 = {one: 1};
            var source2 = {
                two: {
                    writable: false,
                    value: 2
                }
            };
            var source3 = {three: 3};

            Object.defineProperties(target, assignDescriptors(source1, source2, source3));
            (function() {
                target.two = 'One';
            }).should.throw(TypeError);
        });
        it('should set non-enumerable properties provided by a raw descriptor object', function () {
            var target = {};
            var source1 = {one: 1};
            var source2 = null;
            var source3 = {
                two: 'Two',
                three: {
                    enumerable: false,
                    value: true
                }
            };

            (function() {
                Object.defineProperties(target, assignDescriptors(source1, source2, source3));
            }).should.not.throw(TypeError);

            (target).should.have.a.property('one', 1);
            (target).should.have.a.property('two', 'Two');
            (target).should.have.a.property('three', true);
        });
        it('assigning to a (constructor) function should work', function () {
            var Ctor = function Ctor() {};
            // Ctor.prototype = Object.create(Object.prototype, {});

            Object.defineProperties(Ctor, assignDescriptors(Object, {
                one: {
                    configurable: false,
                    enumerable: true,
                    value: 1
                },
                two: {
                    configurable: false,
                    enumerable: true,
                    writable: false,
                    value: 'Two'
                },
                three: {
                    configurable: false,
                    enumerable: true,
                    value: true
                },
                four: {
                    enumerable: true,
                    get: function() {
                        return this._four || (this._four = 4);
                    }
                }
            }));

            // console.log('Object.keys(Ctor)', Object.keys(Ctor));
            (Ctor).should.have.a.property('one', 1);
            (Ctor).should.have.a.property('two', 'Two');
            (Ctor).should.have.a.property('three', true);
            (Ctor).should.have.a.property('four', 4);
            (Ctor.four).should.equal(4);
        });
    });

});
/* ================================================================================================================== */
