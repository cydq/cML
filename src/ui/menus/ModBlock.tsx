import { useState } from "preact/hooks";
import { useSnapshot } from "valtio";

import {
  Sysbox,
  Syscription,
  Sysblock,
  ButtonRow,
  Button,
  Input,
} from "../components";
import type { Mod } from "../../api";
import { index } from "../../store/mod_index";
import { uninstallMod } from "../../util/lifecycle";

export function ModBlock(props: { mod: Mod }) {
  const info = useSnapshot(index).mods[props.mod.name];
  const data = useSnapshot(props.mod.data);
  const options = useSnapshot(props.mod.options);
  const [priority, setPriority] = useState(data["loadPriority"] ?? 0);

  const updatePriority = (priority: string) => {
    if (!priority) {
      props.mod.data["loadPriority"] = 0;
      return setPriority(0);
    }

    const p = parseInt(priority);
    if (isNaN(p)) return;

    props.mod.data["loadPriority"] = parseInt(priority);
    setPriority(priority);
  };

  if (!info)
    return (
      <Sysblock title={props.mod.name}>
        <Sysbox title="Error">
          <Syscription>
            For some reason, we couldn't find any information about this mod.
            Perhaps the mod index is out of date?
          </Syscription>
        </Sysbox>
      </Sysblock>
    );

  return (
    <Sysblock title={props.mod.name}>
      <Sysbox title="Mod Info">
        <Syscription>
          v{info.version} by {info.author}
          <br />
          <br />
          {info.description}
        </Syscription>

        <Input
          placeholder="Loading Priority"
          value={priority}
          update={updatePriority}
        />

        <ButtonRow>
          <Button name="Remove Mod" action={() => uninstallMod(props.mod)} />

          <Button
            name="Revert Settings"
            action={() => {
              delete cML.__meta__.store.data.mods[props.mod.name].options;
            }}
          />

          <Button
            name="Reset Data"
            action={() => {
              delete cML.__meta__.store.data.mods[props.mod.name].data;
            }}
          />
        </ButtonRow>
      </Sysbox>

      {Object.keys(props.mod.optionDefintions).map((key) => {
        const option = props.mod.optionDefintions[key];

        if (option.type === "check") {
          const [value, setValue] = useState(options[key] ?? false);

          const selectedStyle = {
            color: "var(--dark-color)",
            background: "var(--friend-color)",
          } as const;

          return (
            <Sysbox title={option.name ?? "Unnamed option"}>
              <Syscription>{option.description}</Syscription>

              <ButtonRow>
                <Button
                  name="Off"
                  action={() => setValue((props.mod.options[key] = false))}
                  style={!value ? selectedStyle : {}}
                />

                <Button
                  name="On"
                  action={() => setValue((props.mod.options[key] = true))}
                  style={value ? selectedStyle : {}}
                />
              </ButtonRow>
            </Sysbox>
          );
        }

        if (option.type === "input") {
          const [value, setValue] = useState(options[key] ?? "");

          return (
            <Sysbox title={option.name ?? "Unnamed option"}>
              <Syscription>{option.description}</Syscription>

              <Input
                placeholder={option.default}
                value={value}
                update={setValue}
              />

              <ButtonRow>
                <Button
                  name="Revert"
                  action={() => {
                    props.mod.options[key] = option.default;
                    setValue(option.default);
                  }}
                />

                <Button
                  name="Save"
                  action={() => (props.mod.options[key] = value)}
                />
              </ButtonRow>
            </Sysbox>
          );
        }

        return null;
      })}
    </Sysblock>
  );
}
