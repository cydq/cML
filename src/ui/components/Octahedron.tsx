const style = `.solid{position:relative;width:0;height:45px;left:50%;animation:spin 80s infinite linear;transform-style:preserve-3d}.solid .side{position:absolute;left:0;bottom:50%;width:2px;height:38px;background-color:#ffdeb0;filter:blur(0.5px);transform-origin:50% 43px}.solid .side::after{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:7px;height:38px;background-color:#c97500;filter:blur(4px);mix-blend-mode:hard-light}.solid .side:nth-child(1){transform:rotateY(90deg) translateZ(33.936px) rotateX(45deg);border-bottom-color:rgba(136, 236, 147, 0.4)}.solid .side:nth-child(2){transform:rotateY(180deg) translateZ(33.936px) rotateX(45deg);border-bottom-color:rgba(146, 171, 160, 0.4)}.solid .side:nth-child(3){transform:rotateY(270deg) translateZ(33.936px) rotateX(45deg);border-bottom-color:rgba(161, 211, 234, 0.4)}.solid .side:nth-child(4){transform:rotateY(360deg) translateZ(33.936px) rotateX(45deg);border-bottom-color:rgba(101, 232, 179, 0.4)}.solid .side:nth-child(5){transform:rotateY(450deg) translateZ(33.936px) rotateX(135deg);border-bottom-color:rgba(160, 202, 137, 0.4)}.solid .side:nth-child(6){transform:rotateY(540deg) translateZ(33.936px) rotateX(135deg);border-bottom-color:rgba(100, 199, 109, 0.4)}.solid .side:nth-child(7){transform:rotateY(630deg) translateZ(33.936px) rotateX(135deg);border-bottom-color:rgba(75, 225, 116, 0.4)}.solid .side:nth-child(8){transform:rotateY(720deg) translateZ(33.936px) rotateX(135deg);border-bottom-color:rgba(218, 201, 128, 0.4)}.solid .side:nth-child(9){transform:rotateY(45deg) translateZ(24px) translateX(-24px) rotateZ(90deg);border-bottom-color:rgba(218, 201, 128, 0.4)}.solid .side:nth-child(10){transform:rotateY(135deg) translateZ(24px) translateX(-24px) rotateZ(90deg);border-bottom-color:rgba(218, 201, 128, 0.4)}.solid .side:nth-child(11){transform:rotateY(225deg) translateZ(24px) translateX(-24px) rotateZ(90deg);border-bottom-color:rgba(218, 201, 128, 0.4)}.solid .side:nth-child(12){transform:rotateY(315deg) translateZ(24px) translateX(-24px) rotateZ(90deg);border-bottom-color:rgba(218, 201, 128, 0.4)}@keyframes spin{0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(10deg);--rot-am:rotateY(0deg)}30%{transform:rotateX(0deg) rotateY(1080deg) rotateZ(15deg);--rot-am:rotateY(0deg)}70%{transform:rotateX(0deg) rotateY(2520deg) rotateZ(365deg);--rot-am:rotateY(0deg)}100%{transform:rotateX(0deg) rotateY(3600deg) rotateZ(370deg);--rot-am:rotateY(720deg)}}`;

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
          <div className="side" />
          <div className="side" />
          <div className="side" />
          <div className="side" />
        </div>
      </div>
    </>
  );
}
