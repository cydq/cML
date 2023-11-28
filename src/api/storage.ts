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

abstract class BaseStore implements Store {
  protected readonly cache = new Map<string | symbol, any>();

  protected constructor(
    readonly key: string,
    initialData?: Record<string | symbol, any>,
  ) {
    if (initialData)
      for (const key in initialData)
        if (key.startsWith("__") && key.endsWith("__"))
          this.cache.set(Symbol.for(key.slice(2, -2)), initialData[key]);
        else this.cache.set(key, initialData[key]);
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

  protected abstract __commit__(
    key: string,
    obj: Record<string | symbol, any>,
  ): void;

  commit(now = false) {
    const commit = () => {
      const obj: Record<string | symbol, any> = {};

      for (const key of this.cache.keys()) {
        if (typeof key === "symbol")
          obj[`__${key.description}__`] = this.cache.get(key);
        else obj[key] = this.cache.get(key);
      }

      this.__commit__(this.key, obj);
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
}

export class LocalStore extends BaseStore {
  private constructor(key: string) {
    super(key, JSON.parse(localStorage.getItem(key) ?? "{}"));
  }

  override __commit__(key: string, obj: Record<string | symbol, any>) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  static create(key: string): Store;
  static create<T>(key: string): TypedStore<T>;
  static create(key: string) {
    return new LocalStore(key) as any;
  }
}

export class SaveStore extends BaseStore {
  private constructor(key: string) {
    super(key, check(key) ?? {});
  }

  override __commit__(key: string, obj: Record<string | symbol, any>) {
    change(key, obj);
  }

  static create(key: string): Store;
  static create<T>(key: string): TypedStore<T>;
  static create<T>(key: string) {
    return new SaveStore(key) as any;
  }
}
