import { Store } from "../classes/abstract-store";
import { ActionsAndSelectors } from "../types";

function defineProperties(object: any, type: "actions" | "selectors") {

  for (const property in object[type]) {
    Object.defineProperty(object, property, {
      get: () => {
        if (typeof object[type][property] === "function") {
          return ((...args: any[]) => object[type][property](...args)).bind(object)
        }
        return object[type][property];
      }
    })
  }
}


export function createStore<T extends ActionsAndSelectors>(instance: T) {
  
  defineProperties(instance, 'actions');
  defineProperties(instance, 'selectors');

  type Actions = Pick<T, "actions">["actions"];
  type Selectors = Pick<T, "selectors">["selectors"]
  return instance as Actions & Selectors & Store;
}