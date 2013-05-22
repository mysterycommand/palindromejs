/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/util/override'

], function (

    override

) {

    'use strict';

    describe('override', function () {
        it('should exist', function() {
            should.exist(override);
        });
        it('should be a function', function() {
            (override).should.be.a('function');
        });
        it('should write own properties (named by keys) of a source to a target', function() {

            // setup
            var target = {
                name: 'brocolli',
                type: 'vegetable',
                color: 'green',
                healthy: true
            };
            var source = {
                name: 'apple',
                type: 'fruit',
                color: 'red'
            };
            var keys = ['color', 'brand', 'healthy'];

            // override
            override(target, source, keys);

            (target).should.have.property('name', 'brocolli');
            (target).should.have.property('type', 'vegetable');
            (target).should.have.property('color', 'red');
            (target).should.not.have.property('brand');
            (target).should.have.property('healthy', true);
        });
    });

});
/* ================================================================================================================== */
