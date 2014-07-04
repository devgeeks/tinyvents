(function() {
  'use strict';

  var Tinyvents = function() {};

  Tinyvents.prototype.on = function on(event, callback) {
    this._tinyvents = this._tinyvents || {};
    this._tinyvents[event] = this._tinyvents[event] || [];
    this._tinyvents[event].push(callback);
  };

  Tinyvents.prototype.once = function once(event, callback) {
    var fn = function() {
      callback.call(this);
      this.off(event, fn);
    };
    this.on(event, fn);
  };

  Tinyvents.prototype.off = function off(event, callback) {
    this._tinyvents = this._tinyvents || {};
    if (event in this._tinyvents === false) {
      return;
    }
    // Remove all callbacks bound to event
    if (!callback) {
      this._tinyvents[event].splice(0);
      return;
    }
    // ...or, only remove the event attached to the callback in question
    if (callback && this._tinyvents[event].indexOf(callback) !== -1) {
      this._tinyvents[event].splice(this._tinyvents[event].indexOf(callback), 1);
    }
  };

  Tinyvents.prototype.trigger = function trigger(event /* , args... */) {
    this._tinyvents = this._tinyvents || {};
    if (event in this._tinyvents === false) {
      return;
    }
    var eventsLength = this._tinyvents[event].length;
    for (var i = 0; i < eventsLength; i++) {
      this._tinyvents[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  };

  // Aliases for convenience (and in case the on/off/once/trigger methods
  //  exist on the object)
  Tinyvents.prototype.bind = Tinyvents.prototype.on;
  Tinyvents.prototype.one = Tinyvents.prototype.once;
  Tinyvents.prototype.unbind = Tinyvents.prototype.off;
  Tinyvents.prototype.fire = Tinyvents.prototype.trigger;

  // Observe method for mixing these methods into our object
  Tinyvents.observe = function observe(obj) {
    var functions = [
      'on', 'bind', 'once', 'one', 'off', 'unbind', 'trigger', 'fire'
    ];
    var functionsLength = functions.length;
    for (var i = 0; i < functionsLength; i++) {
      if (typeof obj === 'function') {
        obj.prototype[functions[i]] =
          obj.prototype[functions[i]] || Tinyvents.prototype[functions[i]];
      } else {
        obj[functions[i]] = obj[functions[i]] || Tinyvents.prototype[functions[i]];
      }
    }
  };

  // Exports
  if (typeof this.define === 'function' && this.define.amd) {
    this.define(function () {
      return Tinyvents;
    });
  }
  else if (typeof this.module !== 'undefined' && this.module.exports) {
    this.module.exports = Tinyvents;
  }
  else {
    this.Tinyvents = Tinyvents;
  }

}.call(this));
