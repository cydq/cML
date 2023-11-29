export function Input(props: {
  placeholder: string;
  value: string;
  update: (value: string) => void;
}) {
  return (
    <input
      type="textarea"
      placeholder={props.placeholder}
      value={props.value}
      onInput={(e) => props.update((e.target as any).value)}
      style={{
        textAlign: "center",
        border: "1px solid var(--neutral-color)",
        background: "var(--bright-color)",
        padding: "0.5em",
        marginTop: "0.5em",
        fontFamily: "barcodetext, sans-serif",
        lineHeight: "1em",
        fontSize: "2em",
        display: "block",
        width: "100%",
      }}
    />
  );
}
