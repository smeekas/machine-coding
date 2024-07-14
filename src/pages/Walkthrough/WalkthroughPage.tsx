import { useRef, useState } from "react";
import i1 from "../../assets/i1.jpg";
import WalkThrough from "../../components/Walkthrough/WalkThrough";
function WalkthroughPage() {
  const pRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [start, setStart] = useState(false);
  const steps = [
    {
      content: "some p  text",
      target: () => pRef.current,
    },
    {
      content: "some button text",
      target: () => button1Ref.current,
    },
    {
      content: "some div text",
      target: () => divRef.current,
    },
    {
      content: "some button text",
      target: () => button2Ref.current,
    },
    {
      content: "some image text",
      target: () => imageRef.current,
    },
  ];
  return (
    <div
      style={{
        height: "3000px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginTop: "3000px",
      }}
    >
      <button onClick={() => setStart(true)}>Start</button>
      <WalkThrough steps={steps} open={start} onClose={() => setStart(false)} />
      <p ref={pRef}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
        impedit!
      </p>
      <button ref={button1Ref}> new button</button>
      <br />
      <div ref={divRef}>assume big text</div>
      <button ref={button2Ref}>new button</button>
      <img ref={imageRef} src={i1} width={"100px"} />
    </div>
  );
}

export default WalkthroughPage;
