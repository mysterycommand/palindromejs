/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'spec/library/util/assign.test',
    'spec/library/util/descriptors/assignDescriptors.test',
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