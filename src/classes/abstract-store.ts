import produce from "immer"

export abstract class Store<T = {}> {

  private state: T;
  abstract selectors: Record<string, (...args: any[]) => any>
  abstract actions: Record<string, (...args: any[]) => void>
  private _subscribes: (() => void)[] = [];


  constructor(state: T) {
    this.state = state;
  }


  subscribe(subscriber: () => void) {
    this._subscribes.push(subscriber);
    return () => {
      this._subscribes = this._subscribes.filter(s => s !== subscriber);
    }
  }

  set(updateFn: (state: T) => void) {
    const updatedState = produce(this.state, (draft) => {
      updateFn(draft as T);
    });
    if (updatedState !== this.state) {
      this.state = updatedState;
      this._subscribes.forEach(subscriber => subscriber());
    }
  }


  get<TSelected>(selector: (state: T) => TSelected) {
    return selector(this.state) as TSelected;
  }

}
