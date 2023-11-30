import { useSnapshot } from "valtio";
import { InfoBlock } from "./InfoBlock.js";
import { IndexBlock } from "./IndexBlock.js";
import { ModBlock } from "./ModBlock.js";
import { data } from "../../store/data.js";
import { registry } from "../../api/index.js";

export function Menu() {
  return (
    <>
      <InfoBlock />
      <ModsContainer />
      <IndexBlock />
    </>
  );
}

function ModsContainer() {
  const dat = useSnapshot(data());

  return dat.enabled
    .map(registry.getMod)
    .map((mod) => (mod ? <ModBlock mod={mod} /> : null));
}
