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
                    var r = Math.round(Math.random() * 5) + 5;
                    this.sprite.style.width = (2 * r) + 'px';
                    this.sprite.style.height = r + 'px';
                    this.sprite.style.position = 'absolute';
                    this.sprite.style.display = 'none';
                    this.sprite.style.visibility = 'hidden';
                    this.sprite.style.background = randomHex();

                    // console.log(this.sprite.style);
                    var vendors = [
                        'webkit',
                        'ms'
                    ];
                    for (var i = 0; i < vendors.length && ! this.sprite.style.transform; ++i) {
                    }
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
                var style = this.sprite.style;
                var transform = 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px) rotate(' + (Math.atan2(this.vel.y, this.vel.x) * (180 / Math.PI)) + 'deg)';

                style.webkitTransform = transform;
                style.MozTransform = transform;
                style.msTransform = transform;
                style.OTransform = transform;
                style.transform = transform;
                //
                // this.sprite.style.webkitTransform = 'translate3d(' + this.pos.x + 'px, ' + this.pos.y + 'px, 0)';
                //
                // var x = this.pos.x;
                // var y = this.pos.y;
                // this.sprite.style.webkitTransform = 'matrix3d(' + [
                //     [1,0,0,0].join(','),
                //     [0,1,0,0].join(','),
                //     [0,0,1,0].join(','),
                //     [x,y,0,1].join(',')
                // ].join(',') + ')';
                //
                // this.sprite.style.webkitTransform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + this.pos.x + ',' + this.pos.y + ',0,1)';
            }
        };
    });

    return Particle;

});

/* ================================================================================================================== */
