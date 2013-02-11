/** ====================================================================================================== **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ====================================================================================================== **/

define(
    [
    ],
    function(
    ) {
        'use strict';

        var extendz = function(parent, members) {
            return parent;
        };

        extendz({}, {
            static: {
                STATIC_A: true,
                STATIC_B: 'something'
            },
            get: {
                getterA: function() { return this.private.propA; },
                getterB: function() { return 'Some computed property.'; }
            },
            set: {
                setterA: function(value) {
                    this.private.propA = value;
                }
            },
            private: {
                propA: true,
                methodA: function() {
                    if (this.private.propA) { console.log('A'); }
                }
            },
            
            constructor: function() {
            },

            propB: false,
            propC: 1234567890,
            propD: 'This is a test.',
            methodB: function(arg) {
                console.log(arg);
            },
            methodC: function() {
                return this.private.propA;
            },
            methodD: function() {
                return 'D';
            }
        });

        return extendz;
    }
);