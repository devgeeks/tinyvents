/*jshint expr:true */
/* global window, require, describe, it, beforeEach, console */
(function(){
  'use strict';

  var should,
      Tinyvents;

  if (typeof window === 'undefined') {
    should = require('should');
    Tinyvents = require('../lib/tinyvents.js').Tinyvents;
  } else {
    should = window.should;
    Tinyvents = window.Tinyvents;
  }

  describe("Tinyvents", function() {

    it("should have an mixin method to mixin with the object", function() {
      (Tinyvents.mixin).should.be.ok;
      (typeof Tinyvents.mixin).should.equal('function');
    });

    describe("#mixin()", function() {

      var testObject;

      beforeEach(function() {
        testObject = {
          foo: 'bar'
        };
        Tinyvents.mixin(testObject);
      });

      it("should be able to mixin the testObject", function() {
        (testObject.on).should.be.ok;
        (testObject.on).should.equal(Tinyvents.prototype.on);
        (testObject.once).should.be.ok;
        (testObject.once).should.equal(Tinyvents.prototype.once);
        (testObject.off).should.be.ok;
        (testObject.off).should.equal(Tinyvents.prototype.off);
        (testObject.trigger).should.be.ok;
        (testObject.trigger).should.equal(Tinyvents.prototype.trigger);
      });

      it("should have aliases for each main method", function() {
        (testObject.on).should.equal(testObject.bind);
        (testObject.once).should.equal(testObject.one);
        (testObject.off).should.equal(testObject.unbind);
        (testObject.trigger).should.equal(testObject.fire);
      });

    });

    describe("#on()", function() {

      var testObject,
          testCallback;

      beforeEach(function() {
        testObject = {
          foo: 'bar'
        };
        Tinyvents.mixin(testObject);
        testCallback = function testCallback() {};
        testObject.on('onEvent', testCallback);
      });

      it("should be able to add an event listener", function() {
        var _tinyvent = testObject._tinyvents['onEvent'];
        (_tinyvent.length).should.equal(1);
      });

      it ("should add the testCallback to the listener", function() {
        var _tinyvent = testObject._tinyvents['onEvent'];
        (_tinyvent.length).should.equal(1);
        (typeof _tinyvent[0]).should.equal('function');
        (_tinyvent[0] === testCallback).should.be.ok;
      });

    });

    describe("#once()", function() {

      var testObject,
          testCallback;

      beforeEach(function() {
        testObject = {
          foo: 'bar'
        };
        Tinyvents.mixin(testObject);
        testCallback = function testCallback() {};
        testObject.once('onceEvent', testCallback);
      });

      it("should be able to add a once-only event listener", function() {
        var _tinyvent = testObject._tinyvents['onceEvent'];
        (_tinyvent.length).should.equal(1);
      });

      it ("should add the once-only testCallback to the listener", function() {
        var _tinyvent = testObject._tinyvents['onceEvent'];
        (_tinyvent.length).should.equal(1);
        (typeof _tinyvent[0]).should.equal('function');
      });

    });

    describe("#off()", function() {

      var testObject,
          testCallback;

      beforeEach(function() {
        testObject = {
          foo: 'bar'
        };
        Tinyvents.mixin(testObject);
        testCallback = function testCallback() {};
      });

      it("should be able to remove a named event listener", function() {
        testObject.on('offEvent', testCallback);
        var _tinyvent = testObject._tinyvents['offEvent'];
        (_tinyvent.length).should.equal(1);
        (typeof _tinyvent[0]).should.equal('function');
        testObject.off('offEvent', testCallback);
        (typeof _tinyvent[0]).should.equal('undefined');
      });

      it("should be able to remove all event listeners", function() {
        testObject.on('offEvent', testCallback);
        testObject.on('offEvent', function() { console.log(1); });
        var _tinyvent = testObject._tinyvents['offEvent'];
        (_tinyvent.length).should.equal(2);
        (typeof _tinyvent[0]).should.equal('function');
        testObject.off('offEvent');
        (_tinyvent.length).should.not.be.ok;
        (typeof _tinyvent[0]).should.equal('undefined');
      });

    });

    describe("#trigger()", function() {

      var testObject;

      beforeEach(function() {
        testObject = {
          foo: 'bar'
        };
        Tinyvents.mixin(testObject);
      });

      it("should be able to trigger an event listener callback", function(done) {
        testObject.on('triggerEvent', done);
        testObject.trigger('triggerEvent');
      });

      it("should be able trigger and event listener callback with arguments",
          function(done) {
            testObject.on('triggerEventWithArg', function(arg1) {
              arg1.should.be.ok;
              arg1.should.equal('triggered');
              done();
            });
            testObject.trigger('triggerEventWithArg', 'triggered');
          });

      it("should only trigger the specified event", function(done) {
        testObject.on('triggerCorrectEvent', done);
        testObject.on('triggerIncorrectEvent', function() {
          done(new Error('Wrong event triggered: triggerIncorrectEvent'));
        });
        testObject.trigger('triggerCorrectEvent');
      });

    });

  });

})();
