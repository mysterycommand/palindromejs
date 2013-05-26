/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/extend'

], function (

    extend

) {

    'use strict';

    describe('extend', function () {
        it('should exist', function() {
            should.exist(extend);
        });
        it('should be a function', function() {
            (extend).should.be.a('function');
        });
        it.skip('should return a function', function () {
            (extend()).should.be.an.instanceof(Function);
            (extend(Object)).should.be.an.instanceof(Function);
        });
        it.skip('should return a constructor function', function () {
            // Hard to test. If it doesn't extend Object it doesn't get the should method.
            // var Ctor1 = extend();
            // (new Ctor1()).should.be.an.instanceof(Object);

            var Ctor2 = extend(Object);
            (new Ctor2()).should.be.an.instanceof(Object);
        });
        it('should return a constructor with defined constructor properties', function () {
            var Ctor = extend(Object, {
                constructorName: {
                    private: true,
                    value: 'Ctor'
                },
                id: {
                    const: true,
                    value: '0'
                }
            }, {
                constructor: function() {
                    console.log('test');
                }
            });
            // console.log(Ctor);
            (Ctor).should.have.property('id', '0');
        });
    });

});
/* ================================================================================================================== */
