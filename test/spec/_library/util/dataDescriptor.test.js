/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/dataDescriptor'

], function (

    dataDescriptor

) {

    'use strict';

    describe('dataDescriptor', function () {
        it('should exist', function() {
            should.exist(dataDescriptor);
        });
        it('should be a function', function() {
            (dataDescriptor).should.be.a('function');
        });
        describe('should return an object', function () {
            it('with \'enumerable\', \'configurable\', \'writable\', and \'value\'', function () {
                var prop = {
                    value: function() { return null; }
                };

                (dataDescriptor(prop, false, false)).should.include.keys('enumerable', 'configurable', 'writable', 'value');
                (Object.keys(dataDescriptor(prop, false, false))).should.be.length(4);
            });
        });
        describe('should throw an error', function () {
            it('if value is not present', function () {
                var noValue = {};

                (function() {
                    dataDescriptor(noValue, false, false);
                }).should.throw(Error);
            });
            it('if either \'get\' or \'set\' or both exist', function () {
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
                    dataDescriptor(badGetter, false, false);
                }).should.throw(Error);
                (function() {
                    dataDescriptor(badSetter, false, false);
                }).should.throw(Error);
                (function() {
                    dataDescriptor(badAccessor, false, false);
                }).should.throw(Error);
            });
        });
    });

});
/* ================================================================================================================== */
