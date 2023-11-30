import { useState } from "preact/hooks";
import { useSnapshot } from "valtio";

import {
  Sysbox,
  Syscription,
  Sysblock,
  ButtonRow,
  Button,
  Input,
} from "../components/index.js";
import type { Mod } from "../../api/index.js";
import { index } from "../../store/mod_index.js";
import { uninstallMod } from "../../util/lifecycle.js";

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
          <Button name="Revert" action={props.mod.resetOptions} />
          <Button name="Reset Data" action={props.mod.resetData} />
        </ButtonRow>
      </Sysbox>

      {Object.keys(props.mod.optionDefintions).map((key) => {
        const option = props.mod.optionDefintions[key];

        if (option.type === "check") {
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
                  action={() => (props.mod.options[key] = false)}
                  style={!options[key] ? selectedStyle : {}}
                />

                <Button
                  name="On"
                  action={() => (props.mod.options[key] = true)}
                  style={options[key] ? selectedStyle : {}}
                />
              </ButtonRow>
            </Sysbox>
          );
        }

        if (option.type === "input") {
          return (
            <Sysbox title={option.name ?? "Unnamed option"}>
              <Syscription>{option.description}</Syscription>

              <Input
                placeholder={option.default}
                value={options[key]}
                update={(s) => (props.mod.options[key] = s)}
              />

              <ButtonRow>
                <Button
                  name="Revert"
                  action={() => (props.mod.options[key] = option.default)}
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
