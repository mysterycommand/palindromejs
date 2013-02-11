/** ====================================================================================================== **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
        'app/lib/CoreObject'
    ],

    function(
        CoreObject
    ) {
        'use strict';
        
        describe('CoreObject', function() {
            it('should exist', function() {
                CoreObject.should.exist;
            });
        });
    }
);
