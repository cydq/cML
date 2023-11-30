import { useSnapshot } from "valtio";

import {
  Sysbox,
  Syscription,
  Sysblock,
  ButtonRow,
  Button,
} from "../components/index.js";
import { index } from "../../store/mod_index.js";
import { installMod } from "../../util/lifecycle.js";
import { data } from "../../store/data.js";

export function IndexBlock() {
  const idx = useSnapshot(index);
  const dat = useSnapshot(data());

  return (
    <Sysblock title="Available Mods">
      {Object.entries(idx.mods).map(([name, mod]) => {
        if (!mod || dat.enabled.includes(name)) return null;

        return (
          <Sysbox title={name}>
            <Syscription>
              v{mod.version} by {mod.author}
              <br />
              <br />
              {mod.description}
            </Syscription>

            <ButtonRow>
              <Button name="Add" action={() => installMod(name)} />
            </ButtonRow>
          </Sysbox>
        );
      })}
    </Sysblock>
  );
}
