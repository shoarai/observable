# observable

### Usage
#### concrete-observable.js
```js
let Observable = require('./observable');

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
```

#### Observe the concrete-observable
```js
let Observable = require('./concrete-observable');
let observable = new Observable('first');
observable.addEventListener(Observable.Event.Name, (observable) => {
  console.log('name is updated', observable.name);
});

observable.name = "second";  // output: "name is updated", "second"
```
