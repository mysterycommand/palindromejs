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

    deps: ['main'],

    paths: {
        jquery: '../bower_components/jquery/jquery',
        lodash: '../bower_components/lodash/lodash'
    },

    shim: {
        jquery: {
            exports: '$',
            init: function() {
                return this.$.noConflict();
            }
        },
        lodash: {
            exports: '_',
            init: function() {
                return this._.noConflict();
            }
        }
    }

});

/* ================================================================================================================== */
