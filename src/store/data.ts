export interface DataStore {
  /**
   * A list of mods by name
   */
  mods: string[];

  /**
   * A list of files to inject
   */
  files: string[];

  /**
   * A list of enabled mods
   */
  enabled: string[];

  indexUrl: string | undefined;
}

export const data = () => cML.createSaveStore<DataStore>("data");

export function resetDataStore() {
  delete cML.__meta__.store.data.data;
}

export function resetAllSaveStores() {
  cML.__meta__.store.data = {};
}
