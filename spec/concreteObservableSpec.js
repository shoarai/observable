let Observable = require('./concreteObservable');

describe('Observable', () => {
  let _observable;

  beforeEach(() => {
    _observable = new Observable('first');
  });

  it('get name', () => {
    expect(_observable.name).toEqual('first');
  })

  describe('having event listeners', () => {
    let _spy;
    let eventName;

    beforeEach(() => {
      eventName = _observable.Event.Name;
      _spy = jasmine.createSpyObj('spy', [eventName]);
      _observable.addEventListener(eventName, _spy[eventName]);
    });

    describe('when an event is dispatched', () => {
      beforeEach(() => {
        _observable.name = 'second';
      });

      it('have excuted callbacks of the event', () => {
        expect(_spy[eventName]).toHaveBeenCalledWith(_observable);
        expect(_observable.name).toEqual('second');
      });
    });
  });
});