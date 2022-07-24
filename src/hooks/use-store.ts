import { useEffect, useState } from "react";
import { Store } from "../classes/abstract-store";

export function useStore<T>(store: T & Store) {
  const [_, setState] = useState({});
  function onUpdate() {
    setState({});
  }
  useEffect(() => {
    const unsubscribe = store.subscribe(onUpdate);
    return () => unsubscribe();
  }, [])
  return store as T;
}