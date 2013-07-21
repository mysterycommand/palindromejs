/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'library/core/CoreObject',
    'library/particles/Particle',
    'library/particles/Pool'

], function (

    CoreObject,
    Particle,
    Pool

) {

    'use strict';

    var Field = CoreObject.extend(null, function(base) {
        return {
            instanceDefaults: {
                get: function() {
                    var inherited = base.describe('instanceDefaults').get.call(this);
                    return Field.assign(inherited, {
                        _particlePool: {
                            configurable: false,
                            enumerable: false,
                            value: Pool.create({
                                Ctor: Particle,
                                totalSize: 1000
                            })
                        },
                        _particles: {
                            configurable: false,
                            enumerable: false,
                            value: []
                        },
                        _container: {
                            configurable: false,
                            enumerable: false,
                            value: null
                        },
                        _createFX: {
                            configurable: false,
                            enumerable: false,
                            value: []
                        },
                        _updateFX: {
                            configurable: false,
                            enumerable: false,
                            value: []
                        },
                        _deleteFX: {
                            configurable: false,
                            enumerable: false,
                            value: []
                        }
                    });
                }
            },
            constructor: function Field(instanceProps) {
                base.constructor.call(this, instanceProps);
                if (this.container === null) {
                    this.container = document.getElementById('js-main');
                    this.container.style.width = 960 + 'px';
                    this.container.style.height = 540 + 'px';

                    var pool = this.particlePool;
                    var p;
                    var i = 0;
                    var len = pool.totalSize;
                    for (i, len; i < len; ++i) {
                        p = pool.at(i);
                        this.container.appendChild(p.sprite);
                    }
                }
            },
            particlePool: {
                get: function() { return this._particlePool; }
            },
            particles: {
                get: function() { return this._particles; }
            },
            container: {
                get: function() { return this._container; },
                set: function(value) { this._container = value; }
            },
            addCreateEffect: function(effect) {
                this._addEffectTo(this._createFX, effect);
            },
            removeCreateEffect: function(effect) {
                this._removeEffectFrom(this._createFX, effect);
            },
            addUpdateEffect: function(effect) {
                this._addEffectTo(this._updateFX, effect);
            },
            removeUpdateEffect: function(effect) {
                this._removeEffectFrom(this._updateFX, effect);
            },
            addDeleteEffect: function(effect) {
                this._addEffectTo(this._deleteFX, effect);
            },
            removeDeleteEffect: function(effect) {
                this._removeEffectFrom(this._deleteFX, effect);
            },
            update: function() {
                this._executeEffects(this._createFX);
                this._executeEffects(this._updateFX);
                this._executeEffects(this._deleteFX);
            },
            render: function() {
                var particles = this.particles;
                var p;
                var i = 0;
                var len = particles.length;
                for (i, len; i < len; ++i) {
                    p = particles[i];
                    p.render();
                }
            },
            _addEffectTo: {
                configurable: false,
                enumerable: false,
                value: function(queue, effect) {
                    queue.push(effect);
                }
            },
            _removeEffectFrom: {
                configurable: false,
                enumerable: false,
                value: function(queue, effect) {
                    var index = queue.indexOf(effect);
                    if (index > -1) {
                        queue.splice(index, 1);
                    }
                }
            },
            _executeEffects: {
                configurable: false,
                enumerable: false,
                value: function(queue) {
                    var i = 0;
                    var len = queue.length;
                    for (i, len; i < len; ++i) {
                        queue[i].execute();
                    }
                }
            }
        };
    });

    return Field;

});

/* ================================================================================================================== */
