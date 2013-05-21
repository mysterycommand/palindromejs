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
        it('should create an instance of CoreObject', function() {
            (new CoreObject()).should.be.an.instanceof(CoreObject);
        });
    });

});
/* ================================================================================================================== */
