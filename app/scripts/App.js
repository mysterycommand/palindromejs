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

                var field = Field.create();

                var mouseX = 480;
                var mouseY = 270;
                field.container.addEventListener('mousemove', function(event) {
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                });

                field.addCreateEffect(Command.create({
                    target: field,
                    fn: function() {
                        var particles = this.target.particles;
                        var pool = this.target.particlePool;
                        var p;
                        // Trying to put all the particles on the screen at once doesn't seem to work.
                        // while ((p = pool.acquire()) !== null) {
                        //     p.pos.x = mouseX;
                        //     p.pos.y = mouseY;
                        //     p.vel.x = (Math.random() * 10) - 5;
                        //     p.vel.y = (Math.random() * 10) - 5;
                        //     p.sprite.style.display = 'block';
                        //     p.sprite.style.visibility = 'visible';
                        //     particles.push(p);
                        // }
                        p = pool.acquire();
                        if (p !== null) {
                            p.pos.x = mouseX;
                            p.pos.y = mouseY;
                            p.vel.x = (Math.random() * 10) - 5;
                            p.vel.y = (Math.random() * 10) - 5;
                            p.sprite.style.display = 'block';
                            p.sprite.style.visibility = 'visible';
                            particles.push(p);
                        }
                        // p = pool.acquire();
                        // if (p !== null) {
                        //     p.pos.x = mouseX;
                        //     p.pos.y = mouseY;
                        //     p.vel.x = (Math.random() * 10) - 5;
                        //     p.vel.y = (Math.random() * 10) - 5;
                        //     p.sprite.style.display = 'block';
                        //     p.sprite.style.visibility = 'visible';
                        //     particles.push(p);
                        // }
                        // p = pool.acquire();
                        // if (p !== null) {
                        //     p.pos.x = mouseX;
                        //     p.pos.y = mouseY;
                        //     p.vel.x = (Math.random() * 10) - 5;
                        //     p.vel.y = (Math.random() * 10) - 5;
                        //     p.sprite.style.display = 'block';
                        //     p.sprite.style.visibility = 'visible';
                        //     particles.push(p);
                        // }
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

                var code = document.getElementById('js-code');
                var debug;

                // Running update/render in alternating frames doesn't appear to have any benefit.
                // function update(time) {
                //     window.requestAnimationFrame(render);
                //     field.update();
                // }
                // function render(time) {
                //     window.requestAnimationFrame(update);
                //     field.render();
                //     debug = document.createTextNode('particles: ' + field.particles.length);
                //     if (code.firstChild) {
                //         code.replaceChild(debug, code.firstChild);
                //     } else {
                //         code.appendChild(debug);
                //     }
                // }

                function updateAndRender(time) {
                    window.requestAnimationFrame(updateAndRender);
                    field.update();
                    field.render();

                    debug = document.createTextNode('particles: ' + field.particles.length);
                    if (code.firstChild) {
                        code.replaceChild(debug, code.firstChild);
                    } else {
                        code.appendChild(debug);
                    }
                }

                // window.requestAnimationFrame(update);
                window.requestAnimationFrame(updateAndRender);
            }
        };
    });

    return App;

});

/* ================================================================================================================== */
