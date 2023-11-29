export interface IndexStore {
  version: number;
  hash: number;

  mods: {
    [name: string]: {
      version: string;
      description?: string;
      author?: string;
      entry: string;
    };
  };
}

export const index = cML.createLocalStore<IndexStore>("index");

export function resetIndexStore() {
  index.version = 0;
  localStorage.removeItem("cml.index");
}
