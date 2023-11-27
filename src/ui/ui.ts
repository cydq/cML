import { createMenu, createSysbox, createInput } from "./utils";
import { writeIndex } from "../util/mod_index";
import { __hash__, index } from "../store/mod_index";
import { data } from "../store/data";

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
        `There are ${[...index.keys()].length - 2} mod(s) in the index.\n` +
        `The index was last updated on ${new Date(index.get(__hash__) ?? 0)
          .toISOString()
          .slice(0, 10)}`,
      buttons: [
        [
          {
            title: "Refresh Index",
            action: () => {
              index.clear();
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
              index.clear();
              data.clear();
              location.reload();
            },
          },
          {
            title: "Reset All Data",
            action: () => {
              for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key?.startsWith("cml")) {
                  localStorage.removeItem(key);
                }
              }

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

    modMenu.appendChild(
      createSysbox({
        title: "Mod Info",
        description: `v${info.version} by ${info.author}\n\n${info.description}`,
        buttons: [
          [
            {
              title: "Disable",
              action: () => {
                data.set(
                  "enabled",
                  data.get("enabled")?.filter((s) => s !== mod.name) ?? [],
                );
                location.reload();
              },
            },
            {
              title: "Revert",
              action: () => {
                for (const key of Object.keys(mod.opt.options as {})) {
                  const option = mod.opt.options?.[key];
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

    for (const key of Object.keys(mod.opt.options as {})) {
      const option = mod.opt.options?.[key];
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
                    const def = mod.opt.options?.[key]?.default;
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
              action: () => {
                data.set("enabled", [...data.get("enabled", []), name]);
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
