/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/accessorDescriptor'

], function (

    accessorDescriptor

) {

    'use strict';

    describe('accessorDescriptor', function () {
        it('should exist', function() {
            should.exist(accessorDescriptor);
        });
        it('should be a function', function() {
            (accessorDescriptor).should.be.a('function');
        });
        describe('should return an object', function () {
            it('with \'enumerable\', \'configurable\', and \'get\'', function () {
                var prop = {
                    get: function() { return null; }
                };

                (accessorDescriptor(prop, false, false)).should.include.keys('enumerable', 'configurable', 'get');
                (accessorDescriptor(prop, false, false)).should.not.include.keys('set');
                (Object.keys(accessorDescriptor(prop, false, false))).should.be.length(3);
            });
            it('with \'enumerable\', \'configurable\', and \'set\'', function () {
                var prop = {
                    set: function() {}
                };

                (accessorDescriptor(prop, false, false)).should.include.keys('enumerable', 'configurable', 'set');
                (accessorDescriptor(prop, false, false)).should.not.include.keys('get');
                (Object.keys(accessorDescriptor(prop, false, false))).should.be.length(3);
            });
            it('with \'enumerable\', \'configurable\', and \'get\' and \'set\'', function () {
                var prop = {
                    get: function() { return null; },
                    set: function() {}
                };

                (accessorDescriptor(prop, false, false)).should.include.keys('enumerable', 'configurable', 'get', 'set');
                (Object.keys(accessorDescriptor(prop, false, false))).should.be.length(4);
            });
        });
        describe('should throw an error', function () {
            it('if \'set\' exists, and isConst is true', function () {
                var prop = {
                    set: function() {}
                };

                // should.throw uses try/catch, so it needs to be wrapped in a function that can be executed later
                // https://github.com/chaijs/chai/issues/71#issuecomment-6074719
                (function() {
                    accessorDescriptor(prop, false, true);
                }).should.throw(Error);
            });
            it('if either \'get\' or \'set\' or both exist, and \'value\' exists', function () {
                var badGetter = {
                    get: function() { return null; },
                    value: null
                };
                var badSetter = {
                    set: function() {},
                    value: null
                };
                var badAccessor = {
                    get: function() { return null; },
                    set: function() {},
                    value: null
                };

                (function() {
                    accessorDescriptor(badGetter, false, false);
                }).should.throw(Error);
                (function() {
                    accessorDescriptor(badSetter, false, false);
                }).should.throw(Error);
                (function() {
                    accessorDescriptor(badAccessor, false, false);
                }).should.throw(Error);
            });
        });
    });

});
/* ================================================================================================================== */
