import type { ReactNode } from "react";

export function Definition(props: {
  definition: string;
  children?: ReactNode;
}) {
  return (
    // @ts-ignore
    <span className="definition" definition={props.definition}>
      {props.children}
    </span>
  );
}
