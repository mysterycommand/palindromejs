/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint newcap: false */

define([

    'library/util/descriptors/assignDescriptors',
    'library/util/extend',
    'library/util/unique'

], function (

    assignDescriptors,
    extend,
    unique

) {

    'use strict';

    var CoreObject = extend(Object, {
        // 'public static' members
        extend: function(staticProps, protoProps) {
            return extend(this, staticProps, protoProps);
        },
        create: function() {
            return new this(arguments);
        },
        assign: function() {
            return assignDescriptors.apply(null, arguments);
        }
        // 'private static' members
    }, {
        // 'public' accessor members
        instanceDefaults: {
            get: function() {
                var ctor = this.constructor.name;
                var name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1);
                var uniqueId = unique(ctor);
                return {
                    instanceId: {
                        value: uniqueId,
                        writable: false
                    },
                    instanceName: {
                        value: name + uniqueId,
                        writable: false
                    }
                };
            }
        },
        constructor: function CoreObject() {
            // console.log(this.constructorName + '#constructor', arguments);
            CoreObject.assign(this, this.instanceDefaults);
        },
        // 'public' members
        toString: function() {
            return '[' + (typeof this) + ' ' + this.constructor.name + ']';
        }
        // 'private' members
    });

    return CoreObject;

});

/* ================================================================================================================== */
