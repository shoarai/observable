'use strict';

let Observable = require('../observable');

module.exports = class ConcreteObservable extends Observable {
  constructor(name) {
    let event = 'name';
    super(event);
    this.Event = {
      Name: event
    };
    this._name = name;
  }
  set name(name) {
    this._name = name;
    super.dispatchEvent(this.Event.Name);
  }
  get name() {
    return this._name;
  }
}