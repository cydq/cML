const style = `.solid {position: relative;width: 48px;height: 48px;animation: spin 16s infinite linear;transform-style: preserve-3d;}.solid .side {position: absolute;left: 0;bottom: 50%;border-bottom: 41.568px solid black;border-left: 24px solid transparent;border-right: 24px solid transparent;transform-origin: 50% 100%;}.solid .side:nth-child(1) {transform: rotateY(90deg) translateZ(24px) rotateX(35.27deg);border-bottom-color: rgba(136, 236, 147, 0.4);}.solid .side:nth-child(2) {transform: rotateY(180deg) translateZ(24px) rotateX(35.27deg);border-bottom-color: rgba(146, 171, 160, 0.4);}.solid .side:nth-child(3) {transform: rotateY(270deg) translateZ(24px) rotateX(35.27deg);border-bottom-color: rgba(161, 211, 234, 0.4);}.solid .side:nth-child(4) {transform: rotateY(360deg) translateZ(24px) rotateX(35.27deg);border-bottom-color: rgba(101, 232, 179, 0.4);}.solid .side:nth-child(5) {transform: rotateY(450deg) translateZ(24px) rotateX(144.73deg);border-bottom-color: rgba(160, 202, 137, 0.4);}.solid .side:nth-child(6) {transform: rotateY(540deg) translateZ(24px) rotateX(144.73deg);border-bottom-color: rgba(100, 199, 109, 0.4);}.solid .side:nth-child(7) {transform: rotateY(630deg) translateZ(24px) rotateX(144.73deg);border-bottom-color: rgba(75, 225, 116, 0.4);}.solid .side:nth-child(8) {transform: rotateY(720deg) translateZ(24px) rotateX(144.73deg);border-bottom-color: rgba(218, 201, 128, 0.4);}@keyframes spin {0% {transform: rotateX(-10deg) rotateY(0deg) rotateZ(20deg);}100% {transform: rotateX(-10deg) rotateY(720deg) rotateZ(20deg);}}`;
export function Octahedron(props: { onClick?: () => void }) {
  return (
    <>
      <style>{style}</style>

      <div
        style={{
          position: "relative",
          width: "48px",
          height: "48px",
          left: "50%",
          marginTop: "20px",
          marginBottom: "20px",
          transform: "translate(-50%, -0%)",
        }}
        onClick={props.onClick}
      >
        <div className="solid">
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
        </div>
      </div>
    </>
  );
}
