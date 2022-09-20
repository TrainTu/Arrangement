import { reacitve } from "./index";

export class Store {
  constructor(options = {}) {
    let { state, mutations, plugins } = options;
    this._vm = reacitve(state);
    this._mutations = mutations;

    this._subscirbe = [];
    plugins.forEach(plugin => plugin(this));
  }

  get state() {
    return this._vm;
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      return;
    }
    entry(this.state, payload);

    this._subscirbe.forEach(sub => sub({ type, payload }, this.state));
  }

  subscribe(fn) {
    if (!this._subscirbe.includes(fn)) {
      this._subscirbe.push(fn);
    }
  }
}
