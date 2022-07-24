export abstract class Store<T = {}> {

  private state: T;
  abstract selectors: Record<string, any>
  abstract actions: Record<string, (payload: any) => void>
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
    updateFn(this.state);
    this._subscribes.forEach(subscriber => subscriber());
  }


  get<TSelected>(selector: (state: T) => TSelected) {
    return selector(this.state) as TSelected;
  }

}
