import { HandlerDefinition, Mod, ModEvent, OptionDefinition } from "./mod";
import { LocalStore } from "../storage";
import { registry } from "../registry";

export interface ModBuilder {
  autoRegister: boolean;

  option(name: string, options: OptionDefinition): void;
  on(condition: string, handle: (mod: Mod) => void): void;
}

export function define(name: string, fn: (builder: ModBuilder) => void) {
  const ctx = {
    enabled: false,
    loaded: false,
    options: {} as Record<string, OptionDefinition>,
    handlers: [] as HandlerDefinition[],
  };

  const builder = {
    autoRegister: true,

    option: (name: string, options: OptionDefinition) =>
      (ctx.options[name] = options),

    on: (condition: string, handle: (mod: Mod) => void) =>
      ctx.handlers.push({ condition, handle }),
  };

  fn(builder);

  const mod = {
    get name() {
      return name;
    },

    get loaded() {
      return ctx.loaded;
    },

    get enabled() {
      return ctx.enabled;
    },

    get opt() {
      return ctx.options;
    },

    options: LocalStore.create(`cml.${name}.options`),
    data: LocalStore.create(`cml.${name}.data`),

    emit(event: ModEvent) {
      if (event === "load" && ctx.loaded) return;
      if (event === "unload" && !ctx.loaded) return;
      if (event === "enable" && ctx.enabled) return;
      if (event === "disable" && !ctx.enabled) return;

      ctx.handlers
        .filter((handler: HandlerDefinition) =>
          handler.condition
            .trim()
            .split(" ")
            .every((condition) => {
              if (condition.startsWith("@"))
                return condition.slice(1) === cML.getPage();

              return condition === event;
            }),
        )
        .forEach((h) => h.handle?.(mod));

      if (event === "enable") ctx.enabled = true;
      if (event === "disable") ctx.enabled = false;
      if (event === "load") ctx.loaded = true;
      if (event === "unload") ctx.loaded = false;
    },
  } satisfies Mod;

  if (ctx.options) {
    for (const key of Object.keys(ctx.options)) {
      const option = ctx.options[key];
      if (!mod.options.has(key)) mod.options.set(key, option.default);
    }
  }

  if (builder.autoRegister) {
    registry.register(mod);
  }

  return mod;
}
