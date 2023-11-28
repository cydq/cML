import { createMenu, createSysbox, createInput } from "./utils";
import { writeIndex } from "../util/mod_index";
import { __hash__, index, resetIndexStore } from "../store/mod_index";
import { data, resetAllSaveStores, resetDataStore } from "../store/data";
import { installMod, uninstallMod } from "../util/lifecycle";

export function injectMenu() {
  const menu = createMenu({ title: "cModLoader", id: "cml" });

  menu.appendChild(
    createSysbox({
      title: "Info",
      description:
        `cModLoader ${cML.__meta__.version} by cydq\n\n` +
        `swup by ripplesplash`,
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Mod Index",
      description:
        `There are ${[...index.keys()].length - 2} mods in the index.\n` +
        `The index was last updated on ${new Date(index.get(__hash__) ?? 0)
          .toISOString()
          .slice(0, 10)}`,
      buttons: [
        [
          {
            title: "Refresh Index",
            action: () => {
              resetIndexStore();
              location.reload();
            },
          },
        ],
      ],
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Reset",
      description: `Reset all cModLoder data and refresh the page. Optionally, reset mod data as well.`,
      buttons: [
        [
          {
            title: "Reset CML Data",
            action: () => {
              resetIndexStore();
              resetDataStore();

              location.reload();
            },
          },
          {
            title: "Reset All Data",
            action: () => {
              resetIndexStore();
              resetAllSaveStores();

              location.reload();
            },
          },
        ],
      ],
    }),
  );

  menu.appendChild(
    createSysbox({
      title: "Mod Index URL",
      description: "Only change this if you know what you're doing!",
      intermediate: [
        createInput({
          id: "index-url",
          placeholder: "https://cml.snowy.cafe/index.json",
          data: data.get("indexUrl"),
        }),
        createInput({
          id: "index-data",
          placeholder: "{ ... json ... }",
        }),
      ],
      buttons: [
        [
          {
            title: "Reset Default",
            action: () => {
              data.remove("indexUrl");
              index.clear();
              location.reload();
            },
          },
          {
            title: "Save Data",
            action: () => {
              const json = JSON.parse(
                (document.querySelector("#index-data") as HTMLInputElement)
                  .value,
              );

              writeIndex(json);

              location.reload();
            },
          },
          {
            title: "Save URL",
            action: () => {
              data.set(
                "indexUrl",
                (document.querySelector("#index-url") as HTMLInputElement)
                  .value,
              );

              index.clear();
              location.reload();
            },
          },
        ],
      ],
    }),
  );

  document.querySelector("#system-menu")?.appendChild(menu);

  for (const mod of cML.registry.getMods()) {
    const info = index.get(mod.name);

    if (!info) {
      console.warn(
        `[cML] Failed to find info for mod ${mod.name}. Is the index up to date?`,
      );
      continue;
    }

    const modMenu = createMenu({ title: mod.name, id: "cml-mod-" + mod.name });

    const priority = createInput({
      id: `cml-mod-${mod.name}-load-order`,
      placeholder: "0",
      data: mod.data.get("load-priority", 0).toString(),
    });

    priority.onchange = () => {
      const num = parseInt(priority.value);
      if (!num || isNaN(num)) return;

      mod.data.set("load-priority", num);
    };

    modMenu.appendChild(
      createSysbox({
        title: "Mod Info",
        description: `v${info.version} by ${info.author}\n\n${info.description}`,
        intermediate: [priority],
        buttons: [
          [
            {
              title: "Remove Mod",
              action: () => {
                uninstallMod(mod);
                location.reload();
              },
            },
            {
              title: "Revert Settings",
              action: () => {
                for (const key of Object.keys(mod.opt)) {
                  const option = mod.opt[key];
                  if (!option) continue;
                  mod.options.set(key, option.default);
                }
              },
            },
            {
              title: "Reset Data",
              action: () => mod.data.clear(),
            },
          ],
        ],
      }),
    );

    for (const key of Object.keys(mod.opt)) {
      const option = mod.opt[key];
      if (!option) continue;

      if (option.type === "check") {
        modMenu.appendChild(
          createSysbox({
            title: option.name ?? "Unnamed option",
            description: option.description,
            buttons: [
              [
                {
                  title: "Off",
                  action: () => mod.options.set(key, false),
                },
                {
                  title: "On",
                  action: () => mod.options.set(key, true),
                },
              ],
            ],
          }),
        );
      }

      if (option.type === "input") {
        modMenu.appendChild(
          createSysbox({
            title: option.name ?? "Unnamed option",
            description: option.description,
            intermediate: [
              createInput({
                id: `cml-mod-${mod.name}-opt-${key}`,
                placeholder: option.default,
              }),
            ],
            buttons: [
              [
                {
                  title: "Revert",
                  action: () => {
                    const e = document.getElementById(
                      `cml-mod-${mod.name}-opt-${key}`,
                    );
                    const def = mod.opt[key]?.default;
                    mod.options.set(key, def);
                    (e as HTMLInputElement).value = def;
                  },
                },
                {
                  title: "Save",
                  action: () => {
                    const e = document.getElementById(
                      `cml-mod-${mod.name}-opt-${key}`,
                    );
                    mod.options.set(key, (e as HTMLInputElement).value ?? "");
                  },
                },
              ],
            ],
          }),
        );
      }
    }

    document.querySelector("#system-menu")?.appendChild(modMenu);
  }

  const available = createMenu({ title: "cML Mod Index", id: "cml-mods" });

  for (const name of index.keys()) {
    if (typeof name !== "string") continue;
    if (data.get("enabled")?.includes(name as string)) continue;

    const mod = index.get(name);
    if (!mod) continue;

    available.appendChild(
      createSysbox({
        title: `${name}`,
        description: `v${mod.version} by ${mod.author}\n\n${mod.description}`,
        buttons: [
          [
            {
              title: "Add",
              action: async () => {
                await installMod(name);
                location.reload();
              },
            },
          ],
        ],
      }),
    );
  }

  document.querySelector("#system-menu")?.appendChild(available);
}
