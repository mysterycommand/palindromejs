/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'spec/test'

], function (

) {

    'use strict';

    return (window.mochaPhantomJS) ? window.mochaPhantomJS.run() : window.mocha.run();

});
/* ================================================================================================================== */
