let Observable = require('../observable');

describe('Observable', () => {
  let _events = [
    'a', 'b', 'c'
  ];
  let _observable;

  beforeEach(() => {
    _observable = new Observable(_events);
  });

  it('throws execption if listener of not existing event is added', () => {
    expect(() => {
      _observable.addEventListener('d', () => {})
    }).toThrow();
  });

  describe('having event listeners', () => {
    let _spy;

    beforeEach(() => {
      _spy = jasmine.createSpyObj('spy', ['a', 'b1', 'b2', 'c']);
      _observable.addEventListener(_events[0], _spy.a);
      _observable.addEventListener(_events[1], _spy.b1);
      _observable.addEventListener(_events[1], _spy.b2);
      _observable.addEventListener(_events[2], _spy.c);
    });

    describe('when an event is dispatched', () => {
      beforeEach(() => {
        _observable.dispatchEvent(_events[1]);
      });

      it('have excuted callbacks of the event', () => {
        expect(_spy.a).not.toHaveBeenCalled();
        expect(_spy.b1).toHaveBeenCalledWith(_observable);
        expect(_spy.b2).toHaveBeenCalledWith(_observable);
        expect(_spy.c).not.toHaveBeenCalled();
      });
    });
  });
});