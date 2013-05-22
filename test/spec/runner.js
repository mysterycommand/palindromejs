/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'spec/library/util/override.test',
    'spec/library/util/accessorDescriptor.test',
    'spec/library/util/dataDescriptor.test',
    'spec/library/util/extend.test',
    'spec/library/CoreObject.test'

], function (

) {

    'use strict';

    // Protect from barfs
    window.console = window.console || function() {};

    // Don't track
    window.notrack = true;

    window.mocha.run();

});
/* ================================================================================================================== */
