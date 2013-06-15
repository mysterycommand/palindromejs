/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'spec/library/core/CoreObject.test',
    'spec/library/core/extend.test',
    'spec/library/util/assign.test',
    'spec/library/util/descriptors/assignDescriptors.test'

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
