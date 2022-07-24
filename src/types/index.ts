export type ActionsAndSelectors = {
  actions:  Record<string, (payload: any) => void>
  selectors:  Record<string, any>
}
