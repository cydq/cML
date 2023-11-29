import { proxy, subscribe, snapshot } from "valtio";

export function createSaveStore<T extends {}>(name: string): T {
  let obj = cML.__meta__.store.data;

  for (const key of name.split(".")) {
    if (!obj[key]) obj[key] = {};
    obj = obj[key];
  }

  return obj;
}

export function createLocalStore<T extends {}>(name: string): T {
  const object = proxy(JSON.parse(localStorage.getItem("cml_" + name) ?? "{}"));

  subscribe(object, () =>
    localStorage.setItem("cml_" + name, JSON.stringify(snapshot(object))),
  );

  return object;
}
