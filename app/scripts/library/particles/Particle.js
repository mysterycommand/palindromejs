/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/util/color/randomHex',
    'library/core/CoreObject',
    'library/math/Vec2'

], function (

    randomHex,
    CoreObject,
    Vec2

) {

    'use strict';

    var Particle = CoreObject.extend({
        GRAVITY: {
            configurable: false,
            value: Vec2.create({ y: 0.1 }),
            writable: false
        }
    }, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return Particle.assign(inherited, {
                        _pos: {
                            configurable: false,
                            enumerable: false,
                            value: Vec2.create({
                                x: 480,
                                y: 270
                            })
                        },
                        _vel: {
                            configurable: false,
                            enumerable: false,
                            value: Vec2.create()
                        },
                        _sprite: {
                            configurable: false,
                            enumerable: false,
                            value: null
                        }
                    });
                }
            },
            constructor: function Particle(instanceProps) {
                base.constructor.call(this, instanceProps);
                if (this.sprite === null) {
                    this.sprite = document.createElement('div');
                    this.sprite.style.width = 10 + 'px';
                    this.sprite.style.height = 10 + 'px';
                    this.sprite.style.position = 'absolute';
                    this.sprite.style.display = 'none';
                    this.sprite.style.visibility = 'hidden';
                    this.sprite.style.background = randomHex();
                }
            },
            pos: {
                get: function() { return this._pos; },
                set: function(value) { this._pos = value; }
            },
            vel: {
                get: function() { return this._vel; },
                set: function(value) { this._vel = value; }
            },
            sprite: {
                get: function() { return this._sprite; },
                set: function(value) { this._sprite = value; }
            },
            update: function() {
                this.vel.plusEq(Particle.GRAVITY);
                this.pos.plusEq(this.vel);
            },
            render: function() {
                this.sprite.style.webkitTransform = 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px)';
            }
        };
    });

    return Particle;

});

/* ================================================================================================================== */
