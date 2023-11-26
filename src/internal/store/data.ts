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

export const data = cML.LocalStore.createTyped<DataStore>("cml");
