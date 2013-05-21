/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/* ================================================================================================================== */

'use strict';

require.config({

    // Run everything relative to tha app/scripts directory.
    baseUrl: '../../app/scripts/',

    deps: [
        // Require in app/scripts/config to get the application & it's dependencies.
        '../../app/scripts/config',
        // Require in test/scripts/main to start the mocha runner.
        '../../test/scripts/main'
    ],

    paths: {
        // Point spec and test/spec.
        spec: '../../test/spec'
    }

});

/* ================================================================================================================== */
