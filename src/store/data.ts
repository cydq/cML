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

export const data = cML.SaveStore.create<DataStore>("cml");

export function resetDataStore() {
  data.clear(false);
  delete flags["cml"];
  localStorage.setItem("flags", flags);
}

export function resetAllSaveStores() {
  for (const key of Object.keys(flags))
    if (key === "cml" || key.startsWith("cml.")) delete flags[key];

  resetDataStore();
}
