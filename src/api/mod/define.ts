import { Mod, ModEvent, OptionDefinition } from "./mod";
import { registry } from "../registry";
import { createSaveStore } from "../store";

interface HandlerDefinition {
  condition: string;
  handle(mod: Mod): void;
}

export interface ModBuilder {
  autoRegister: boolean;
}

export function define<TOpt extends {} = any, TData extends {} = any>(
  name: string,
  fn: (mod: Mod<TOpt, TData>, builder: ModBuilder) => void,
) {
  const ctx = {
    enabled: false,
    loaded: false,
    options: {} as Record<string, OptionDefinition>,
    handlers: [] as HandlerDefinition[],
  };

  const builder = { autoRegister: true };

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

    get options() {
      return createSaveStore<TOpt>(`mods.${name}.options`);
    },

    get data() {
      return createSaveStore<TData>(`mods.${name}.data`);
    },

    get optionDefintions() {
      return ctx.options;
    },

    option: (name: string, options?: OptionDefinition) =>
      options ? (ctx.options[name] = options) : ctx.options[name],

    on: (condition: string, handle: (mod: Mod) => void) =>
      ctx.handlers.push({ condition, handle }),

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
  } satisfies Mod<TOpt, TData>;

  fn(mod, builder);

  if (ctx.options) {
    const mopt = mod.options as any;

    for (const key of Object.keys(ctx.options)) {
      const option = ctx.options[key];

      if (!(key in mopt)) {
        mopt[key] = option.default;
      }
    }
  }

  if (builder.autoRegister) {
    registry.register(mod);
  }

  return mod;
}
