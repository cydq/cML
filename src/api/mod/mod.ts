export interface Mod<TOpt extends {} = any, TData extends {} = any> {
  readonly name: string;

  readonly enabled: boolean;
  readonly loaded: boolean;

  readonly options: TOpt;
  readonly data: TData;

  readonly optionDefinitions: Record<string, OptionDefinition>;

  resetOptions(): void;
  resetData(): void;

  option(name: string): OptionDefinition | undefined;
  option(name: string, options: OptionDefinition): void;

  on(condition: string, handle: (mod: Mod) => void): void;
  emit(event: ModEvent): void;
}

export interface OptionDefinition {
  type: "check" | "input";
  default?: any;
  name?: string;
  description?: string;
}

export type ModEvent =
  | "enable"
  | "disable"
  | "load"
  | "unload"
  | "install"
  | "uninstall";
