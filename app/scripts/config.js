/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/* ================================================================================================================== */

// require.config({
//     paths: {
//         jquery: '../bower_components/jquery/jquery',
//         bootstrap: 'vendor/bootstrap'
//     },
//     shim: {
//         bootstrap: {
//             deps: ['jquery'],
//             exports: 'jquery'
//         }
//     }
// });

'use strict';

require.config({

    deps: ['main'],

    paths: {
        jquery: '../bower_components/jquery/jquery'
    },

    shim: {
        jquery: {
            exports: '$',
            init: function() {
                return this.jQuery.noConflict();
            }
        }
    }

});

/* ================================================================================================================== */
