import { snapshot, subscribe } from "valtio";

export function initStore() {
  const obj = structuredClone(flags.cML ?? {});

  Object.keys(obj).forEach((key) => {
    cML.__meta__.store.data[key] = obj[key];
  });

  subscribe(cML.__meta__.store, () => {
    flags.cML = snapshot(cML.__meta__.store).data;
    localStorage.setItem("flags", JSON.stringify(flags));
  });
}
