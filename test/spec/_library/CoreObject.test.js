/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    describe('CoreObject', function () {
        it('should exist', function() {
            should.exist(CoreObject);
        });
        it('should create instances with new', function() {
            (new CoreObject()).should.be.an.instanceof(CoreObject);
        });
        describe('#create', function() {
            it('should create new instances', function () {
                (CoreObject.create()).should.be.an.instanceof(CoreObject);
            });
        });
    });

});
/* ================================================================================================================== */
