/**
 * @fileOverview Observable executes listeners that subscribe events.
 */
'use strict';

module.exports = class Observable {
  /**
   * Constructor
   * @param {string|string[]} events - Event names
   */
  constructor(events) {
    this._callbacksMap = {};
    this._addEvent(events);
  }
  /**
   * Add event listener.
   * @param {string|string[]} events - Event names
   * @param {function} callback - Callback
   */
  addEventListener(event, callback) {
    if (Array.isArray(event)) {
      for (let i = 0, len = event.length; i < len; i++) {
        this.addEventListener(event[i], callback);
      }
      return;
    }

    if (this._callbacksMap[event] === undefined) {
      throw new Error(`event "${event}" does not exist`);
    }
    if (typeof callback !== 'function') {
      return;
    }

    this._callbacksMap[event].push(callback);
  }
  /**
   * Dispatch an event.
   * @param {string} event - Event name
   */
  dispatchEvent(event) {
    let _callbacks = this._callbacksMap[event];
    for (let i = 0, len = _callbacks.length; i < len; i++) {
      _callbacks[i](this);
    }
  }
  /**
   * Add event.
   * @param {string|string[]} events - Event names
   */
  _addEvent(events) {
    if (Array.isArray(events)) {
      for (let i = 0, len = events.length; i < len; i++) {
        this._addEvent(events[i]);
      }
      return;
    }

    if (this._callbacksMap[events]) {
      return;
    }
    this._callbacksMap[events] = [];
  }
}