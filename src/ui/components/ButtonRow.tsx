import { ReactNode } from "react";

export function ButtonRow(props: { children: ReactNode }) {
  return <div className="buttons">{props.children}</div>;
}
