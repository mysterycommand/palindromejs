/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint laxbreak: true */

define([

    'library/core/CoreObject',
    'library/particles/Particle',
    'library/particles/Field',
    'library/particles/Command'

], function (

    CoreObject,
    Particle,
    Field,
    Command

) {

    'use strict';

    var App = CoreObject.extend({
        VERSION: {
            configurable: false,
            value: '0.0.1',
            writable: false
        }
    }, function(base) {
        return {
            constructor: function App(instanceProps) {
                base.constructor.call(this, instanceProps);

                var particle = Particle.create();
                console.log(particle.toString());
                console.log(Particle.GRAVITY.toString());

                var field = Field.create();
                console.log(field.toString());
                console.log(field.container);

                field.addCreateEffect(Command.create({
                    target: field,
                    fn: function() {
                        var f = this.target;
                        var p = f.particlePool.acquire();
                        if (p !== null) {
                            p.pos.x = 480;
                            p.pos.y = 270;
                            p.vel.x = (Math.random() * 10) - 5;
                            p.vel.y = (Math.random() * 10) - 5;
                            p.sprite.style.display = 'block';
                            p.sprite.style.visibility = 'visible';
                            f.particles.push(p);
                        }
                    }
                }));

                field.addUpdateEffect(Command.create({
                    target: field,
                    fn: function() {
                        var particles = this.target.particles;
                        var pool = this.target.particlePool;
                        var p;
                        var i = 0;
                        var len = particles.length;
                        for (i, len; i < len; ++i) {
                            p = particles[i];
                            p.update();
                        }
                        // console.log(this.target.toString());
                        // console.log('  particles', particles.length);
                        // console.log('  pooled', pool.currentSize);
                    }
                }));

                field.addDeleteEffect(Command.create({
                    target: field,
                    fn: function() {
                        var particles = this.target.particles;
                        var pool = this.target.particlePool;
                        var p;
                        var i = particles.length - 1;
                        var len = 0;
                        for (i, len; i >= len; --i) {
                            p = particles[i];
                            if ( ! (0 < p.pos.x && p.pos.x < 960)
                            ||   ! (0 < p.pos.y && p.pos.y < 540)) {
                                p.sprite.style.display = 'none';
                                p.sprite.style.visibility = 'hidden';
                                pool.release(particles.splice(i, 1)[0]);
                            }
                        }
                    }
                }));

                // var i = 0;
                // var len = 200;
                // for (i, len; i < len; ++i) {
                //     field.update();
                //     field.render();
                // }

                function update(time) {
                    window.requestAnimationFrame(render);
                    field.update();
                }

                function render(time) {
                    window.requestAnimationFrame(update);
                    field.render();
                }

                function updateAndRender(time) {
                    window.requestAnimationFrame(updateAndRender);
                    field.update();
                    field.render();
                }

                window.requestAnimationFrame(updateAndRender);
            }
        };
    });

    return App;

});

/* ================================================================================================================== */
