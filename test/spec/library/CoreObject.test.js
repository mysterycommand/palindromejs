/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/
define([

    'library/CoreObject'

], function (

    CoreObject

) {

    'use strict';

    describe('CoreObject', function () {
        it('should exist', function() {
            should.exist(CoreObject);
        });
        it('should be a function', function() {
            (CoreObject).should.be.a('function');
        });
        it('should be constructor function', function() {
            (new CoreObject()).should.be.an('object');
            (new CoreObject()).should.be.an.instanceof(Object);
            (new CoreObject()).should.be.an.instanceof(CoreObject);
        });
        it('should create objects with instanceId and instanceName properties', function () {
            var coreObject = new CoreObject();
            (coreObject).should.have.a.property('instanceId');
            (coreObject.instanceId).should.be.a('string');
            (coreObject).should.have.a.property('instanceName');
            (coreObject.instanceName).should.be.a('string');
            (coreObject.instanceName).should.contain('coreObject');
        });
        it('should create objects with nice toString output', function () {
            var coreObject = new CoreObject();
            (coreObject).should.have.a.property('toString');
            (coreObject.toString).should.be.a('function');
            (coreObject.toString()).should.contain('object');
            (coreObject.toString()).should.contain('CoreObject');
            (coreObject.toString()).should.equal('[object CoreObject]');
        });
        describe('#extend', function () {
            it('should exist and be a function', function () {
                (CoreObject).should.have.a.property('extend');
                (CoreObject.extend).should.be.a('function');
            });
            it('should return a constructor function', function () {
                var Child = CoreObject.extend();

                (new Child()).should.be.an('object');
                (new Child()).should.be.an.instanceof(Object);
                (new Child()).should.be.an.instanceof(CoreObject);
                (new Child()).should.be.an.instanceof(Child);
            });
            it('should return a constructor function with it\'s own extend method', function () {
                var Child = CoreObject.extend();
                var GrandChild = Child.extend();
                var GreatGrandChild = GrandChild.extend();

                (Child).should.have.a.property('extend');
                (Child.extend).should.be.a('function');

                (GrandChild).should.have.a.property('extend');
                (GrandChild.extend).should.be.a('function');

                (new GrandChild()).should.be.an('object');
                (new GrandChild()).should.be.an.instanceof(Object);
                (new GrandChild()).should.be.an.instanceof(CoreObject);
                (new GrandChild()).should.be.an.instanceof(Child);
                (new GrandChild()).should.be.an.instanceof(GrandChild);

                (GreatGrandChild).should.have.a.property('extend');
                (GreatGrandChild.extend).should.be.a('function');

                (new GreatGrandChild()).should.be.an('object');
                (new GreatGrandChild()).should.be.an.instanceof(Object);
                (new GreatGrandChild()).should.be.an.instanceof(CoreObject);
                (new GreatGrandChild()).should.be.an.instanceof(Child);
                (new GreatGrandChild()).should.be.an.instanceof(GrandChild);
                (new GreatGrandChild()).should.be.an.instanceof(GreatGrandChild);
            });
            it('should create objects with instanceId and instanceName properties', function () {
                var Descendant = CoreObject.extend(null, {
                    constructor: function Descendant() {
                        CoreObject.apply(this, arguments);
                    }
                });
                var descendant = new Descendant();
                (descendant).should.have.a.property('instanceId');
                (descendant.instanceId).should.be.a('string');
                (descendant).should.have.a.property('instanceName');
                (descendant.instanceName).should.be.a('string');
                (descendant.instanceName).should.contain('descendant');
            });
            it('should create objects with nice toString output', function () {
                var Descendant = CoreObject.extend(null, {
                    constructor: function Descendant() {
                        CoreObject.apply(this, arguments);
                    }
                });
                var descendant = new Descendant();
                (descendant).should.have.a.property('toString');
                (descendant.toString).should.be.a('function');
                (descendant.toString()).should.contain('object');
                (descendant.toString()).should.contain('Descendant');
                (descendant.toString()).should.equal('[object Descendant]');
            });
            it('should provide a way of merging instance defaults', function () {
                var Descendant = CoreObject.extend(null, {
                    instanceDefaults: {
                        get: function() {
                            // TODO: eww ..?
                            var inherited = this.super.describe('instanceDefaults').get.call(this);
                            return CoreObject.assign({
                                test: 'This is a test',
                                doSomething: function() { return 'Something.'; },
                                getter: {
                                    get: function() { return 'Getter.'; }
                                }
                            }, inherited);
                        }
                    },
                    constructor: function Descendant() {
                        CoreObject.apply(this, arguments);
                    }
                });
                var descendant = new Descendant();

                (descendant).should.have.a.property('instanceId');
                (descendant.instanceId).should.be.a('string');
                (descendant).should.have.a.property('instanceName');
                (descendant.instanceName).should.be.a('string');
                (descendant).should.have.a.property('test');
                (descendant.test).should.be.a('string');
                (descendant).should.have.a.property('doSomething');
                (descendant.doSomething).should.be.a('function');
                (descendant.doSomething()).should.equal('Something.');
                (descendant).should.have.a.property('getter', 'Getter.');

            });
        });
        describe('#create', function () {
            it('should exist and be a function', function () {
                (CoreObject).should.have.a.property('create');
                (CoreObject.create).should.be.a('function');
            });
            it('should create instances', function () {
                var Child = CoreObject.extend();
                var child = Child.create();

                (child).should.be.an('object');
                (child).should.be.an.instanceof(Object);
                (child).should.be.an.instanceof(CoreObject);
                (child).should.be.an.instanceof(Child);
            });
            it('should work no matter how extended', function () {
                var Child = CoreObject.extend();

                var GrandChild = Child.extend();
                var grandChild = GrandChild.create();

                var GreatGrandChild = GrandChild.extend();
                var greatGrandChild = GreatGrandChild.create();

                (grandChild).should.be.an('object');
                (grandChild).should.be.an.instanceof(Object);
                (grandChild).should.be.an.instanceof(CoreObject);
                (grandChild).should.be.an.instanceof(Child);
                (grandChild).should.be.an.instanceof(GrandChild);

                (greatGrandChild).should.be.an('object');
                (greatGrandChild).should.be.an.instanceof(Object);
                (greatGrandChild).should.be.an.instanceof(CoreObject);
                (greatGrandChild).should.be.an.instanceof(Child);
                (greatGrandChild).should.be.an.instanceof(GrandChild);
                (greatGrandChild).should.be.an.instanceof(GreatGrandChild);
            });
            it('should create objects with instanceId and instanceName properties', function () {
                var Descendant = CoreObject.extend(null, {
                    constructor: function Descendant() {
                        CoreObject.apply(this, arguments);
                    }
                });
                var descendant = Descendant.create();
                (descendant).should.have.a.property('instanceId');
                (descendant.instanceId).should.be.a('string');
                (descendant).should.have.a.property('instanceName');
                (descendant.instanceName).should.be.a('string');
                (descendant.instanceName).should.contain('descendant');
            });
            it('should create objects with nice toString output', function () {
                var Descendant = CoreObject.extend(null, {
                    constructor: function Descendant() {
                        CoreObject.apply(this, arguments);
                    }
                });
                var descendant = Descendant.create();
                (descendant).should.have.a.property('toString');
                (descendant.toString).should.be.a('function');
                (descendant.toString()).should.contain('object');
                (descendant.toString()).should.contain('Descendant');
                (descendant.toString()).should.equal('[object Descendant]');
            });
        });
    });

});
/* ================================================================================================================== */
