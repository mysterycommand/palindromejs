/** ====================================================================================================== **/
/**
 * @fileOverview
 * Main application configuration.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

'use strict';

require.config(
    {
        baseUrl: 'js/',

        deps: ['main'],

        paths: {
            jquery: 'vendor/jquery-1.9.1',
            lodash: 'vendor/lodash-v1.0.1'
        },
        
        shim: {
            jquery: {
                exports: '$',
                init: function() {
                    return window.$.noConflict();
                }
            },

            lodash: {
                exports: '_',
                init: function() {
                    return window._.noConflict();
                }
            }
        }
    }
);