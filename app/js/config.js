/** ====================================================================================================== **/
/**
 * @fileOverview
 * Main application configuration.
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

require.config(
    {
        deps: ['main'],

        paths: {
            jquery: 'vendor/jquery-1.9.0',
            lodash: 'vendor/lodash-v1.0.0-rc.3'
        },
        
        shim: {
            jquery: {
                exports: '$'
            },
            lodash: {
                exports: '_'
            }
        }
    }
);