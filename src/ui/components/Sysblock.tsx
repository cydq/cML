import type { ReactNode } from "react";

export function Sysblock(props: { title: string; children?: ReactNode }) {
  return (
    <details className="sysblock center">
      <summary>{props.title}</summary>

      {props.children}
    </details>
  );
}
