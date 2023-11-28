export const __version__ = Symbol.for("cml_version");
export const __hash__ = Symbol.for("cml_hash");

export interface IndexStore {
  [__version__]: number;
  [__hash__]: number;

  [name: string]: {
    version: string;
    description?: string;
    author?: string;
    entry: string;
  };
}

export const index = cML.LocalStore.create<IndexStore>("cml.index");

export function resetIndexStore() {
  index.clear(false);
  localStorage.removeItem("cml.index");
}
