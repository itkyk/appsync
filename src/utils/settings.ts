export let globalHeaders: {[key: string]: any} = {};

export const setGlobalHeaders = (settings: {[key: string]: any}) => {
  globalHeaders = settings;
}

export const getGlobalHeaders = () => {
  return globalHeaders
}