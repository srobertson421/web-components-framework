class State {
  constructor(value) {
    this.__value = value;
    this.__subscriptions = {};
  }

  get value() {
    return this.__value;
  }

  set value(newVal) {
    const oldVal = this.__value;
    this.__value = newVal;
    Object.getOwnPropertySymbols(this.__subscriptions).forEach(sym => {
      this.__subscriptions[sym](this.__value, oldVal);
    });
  }

  subscribe(callback) {
    const id = Symbol()
    this.__subscriptions[id] = callback;
    return () => {
      delete this.__subscriptions[id];
    }
  }
}

export default State;