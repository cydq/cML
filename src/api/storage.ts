export interface Store {
  get<T>(key: string | symbol): T | undefined;
  get<T>(key: string | symbol, or: T): T;

  set<T>(key: string | symbol, value: T, commit?: boolean): void;
  remove(key: string | symbol, commit?: boolean): void;

  has(key: string | symbol): boolean;

  commit(now?: boolean): void;
  transaction(fn: (s: Store) => void, now?: boolean): void;
  clear(commit?: boolean): void;
  keys(): IterableIterator<string | symbol>;
}

export interface TypedStore<T> {
  get<K extends keyof T>(key: K): T[K] | undefined;
  get<K extends keyof T>(key: K, or: T[K]): T[K];

  set<K extends keyof T>(key: K, value: T[K], commit?: boolean): void;
  remove(key: keyof T, commit?: boolean): void;

  has<K extends keyof T>(key: K): true;
  has(key: string): boolean;

  commit(now?: boolean): void;
  transaction(fn: (s: TypedStore<T>) => void, now?: boolean): void;
  clear(commit?: boolean): void;
  keys(): IterableIterator<keyof T>;
}

export class LocalStore implements Store {
  private readonly cache = new Map<string | symbol, any>();

  private constructor(readonly key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      const obj = JSON.parse(data);

      for (const key in obj) {
        if (key.startsWith("__") && key.endsWith("__"))
          this.cache.set(Symbol.for(key.slice(2, -2)), obj[key]);
        else this.cache.set(key, obj[key]);
      }
    }
  }

  get<T>(key: string | symbol): T | undefined;
  get<T>(key: string | symbol, or: T): T;
  get<T>(key: string | symbol, or?: T): T | undefined {
    const v = this.cache.get(key);
    return v === undefined ? or : v;
  }

  set<T>(key: string | symbol, value: T, commit = true) {
    this.cache.set(key, value);
    if (commit) this.commit();
  }

  remove(key: string | symbol, commit = true) {
    this.cache.delete(key);
    if (commit) this.commit();
  }

  has(key: string | symbol) {
    return this.cache.has(key);
  }

  clear(commit = true) {
    this.cache.clear();
    if (commit) this.commit();
  }

  keys(): IterableIterator<string | symbol> {
    return this.cache.keys();
  }

  commit(now = false) {
    const commit = () => {
      const obj: Record<string | symbol, any> = {};

      for (const key of this.cache.keys()) {
        if (typeof key === "symbol")
          obj[`__${key.description}__`] = this.cache.get(key);
        else obj[key] = this.cache.get(key);
      }

      localStorage.setItem(this.key, JSON.stringify(obj));
    };

    if (now) commit();
    else setTimeout(commit, 0);
  }

  transaction(fn: (s: Store) => void, now = false) {
    fn({
      get: this.get.bind(this),
      set: (k: string, v: any) => {
        this.set(k, v, false);
      },
      remove: (k: string) => {
        this.remove(k, false);
      },
      has: this.has.bind(this),
      commit: () => {},
      transaction: () => {
        throw new Error("Nested transactions are not supported");
      },
      clear: () => {
        this.clear(false);
      },
      keys: this.keys.bind(this),
    });

    this.commit(now);
  }

  static create(key: string) {
    return new LocalStore(key);
  }

  static createTyped<T>(key: string) {
    return new LocalStore(key) as unknown as TypedStore<T>;
  }
}
