export type ActionsAndSelectors = {
  actions:  Record<string, (payload: any) => void>
  selectors:  Record<string, any>
}

export type PickField<T extends ActionsAndSelectors, N extends keyof ActionsAndSelectors> =  Pick<T, N>[N];
