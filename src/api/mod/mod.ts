import { Store } from "../storage";

export interface Mod {
  readonly name: string;
  readonly enabled: boolean;
  readonly loaded: boolean;

  readonly opt: Record<string, OptionDefinition>;

  readonly options: Store;
  readonly data: Store;

  emit(event: ModEvent): void;
}

export interface OptionDefinition {
  type: "check" | "input";
  default?: any;
  name?: string;
  description?: string;
}

export interface HandlerDefinition {
  condition: string;
  handle(mod: Mod): void;
}

export type ModEvent =
  | "enable"
  | "disable"
  | "load"
  | "unload"
  | "install"
  | "uninstall";
