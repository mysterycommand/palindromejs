/** ====================================================================================================== **/
/**
 * @fileOverview
 * Main testing entry point.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/


require.config(
    {
        baseUrl: '../app/js/',
        paths: {
            app: '../../app/js',
            test: '../../test/js'
        }
    }
);

require(
    [
        'test/lib/CoreObject.test'
    ],

    function(
    ) {
        'use strict';

        return (window.mochaPhantomJS) ? window.mochaPhantomJS.run() : window.mocha.run();
    }
);