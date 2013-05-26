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
            (assign).should.be.an.instanceof(Function);
        });
        it('should return an object', function() {
            (assign()).should.be.an.instanceof(Object);
        });
        it('should affect the target', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};
            assign(target, source1, source2, source3);

            (target).should.have.a.property('one', true);
            (target).should.have.a.property('two', true);
            (target).should.have.a.property('three', true);
        });
        it('should work with 1 or 2 arguments too', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};
            assign(target, source1, source2, source3);

            (assign(target, source1)).should.have.a.property('one', true);
            (assign(target, source1, source2)).should.have.a.property('one', true);
            (assign(target, source1, source2)).should.have.a.property('two', true);
        });
        it('should not affect the sources', function() {
            var target = {};
            var source1 = {one: true};
            var source2 = {two: true};
            var source3 = {three: true};
            assign(target, source1, source2, source3);

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
            assign(target, source1, source2, source3);

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
                assign(target, source1, null, source3);
            }).should.not.throw(TypeError);

            (function() {
                assign(target, source1, false, source3);
            }).should.not.throw(TypeError);

            (function() {
                assign(target, source1, undefined, source3);
            }).should.not.throw(TypeError);

            (function() {
                assign(target, source1, '', source3);
            }).should.not.throw(TypeError);

            (function() {
                assign(target, source1, 0, source3);
            }).should.not.throw(TypeError);

            (target).should.have.a.property('one', 1);
            (target).should.have.a.property('two', 'Two');
            (target).should.have.a.property('three', true);
        });
    });

});
/* ================================================================================================================== */
