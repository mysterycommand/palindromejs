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

    paths: {
        // Point spec and test/spec.
        spec: '../../test/spec',
        runner: '../../test/spec/runner'
    },

    // Require in test/spec/runner to start the mocha runner.
    deps: ['runner'],
    shim: {
        // Require in app/scripts/config to get the application & it's dependencies.
        runner: ['config']
    }

});

/* ================================================================================================================== */
