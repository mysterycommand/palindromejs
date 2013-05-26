/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/assign'

], function (

    assign

) {

    'use strict';

    describe('assign', function () {
        it('should exist', function() {
            should.exist(assign);
        });
        it('should be a function', function() {
            (assign).should.be.a('function');
        });
        it('should return an object', function () {
            (assign({})).should.be.an.instanceof(Object);
        });
        it('should accept multiple arguments', function () {
            (assign({}, {one: true}, {two: true}, {three: true})).should.be.an.instanceof(Object);
        });
        it('later arguments should override earlier arguments', function () {
            (assign({}, {one: true}, {two: true}, {two: false, three: true})).should.have.property('two', false);
        });
        it('attempting to override non-configurable properties should throw a TypeError', function () {
            var target = {};
            Object.defineProperties(target, {
                one: {
                    configurable: false,
                    value: 1
                }
            });

            (function() {
                assign(target, {one: true}, {two: true}, {two: false, three: true});
            }).should.throw(TypeError);
        });
        it('attempting to override non-configurable properties should throw a TypeError', function () {
            var target = {};
            var source1 = {};
            var source2 = {};

            Object.defineProperties(source1, {
                one: {
                    configurable: false,
                    enumerable: true,
                    value: 1
                }
            });
            Object.defineProperties(source2, {
                one: {
                    configurable: false,
                    enumerable: true,
                    value: 'One'
                }
            });

            (function() {
                assign(target, source1, source2);
            }).should.throw(TypeError);
        });
        it('attempting to override configurable properties should not throw a TypeError', function () {
            var target = {one: true};
            var source1 = {};
            var source2 = {};

            Object.defineProperties(source1, {
                one: {
                    configurable: true,
                    enumerable: true,
                    value: 1
                }
            });
            Object.defineProperties(source2, {
                one: {
                    configurable: false,
                    enumerable: true,
                    value: 'One'
                }
            });

            (function() {
                assign(target, source1, source2);
            }).should.not.throw(TypeError);
        });
    });

});
/* ================================================================================================================== */
