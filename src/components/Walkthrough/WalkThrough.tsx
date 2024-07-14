import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./WalkThrough.module.css";
type WalkThroughProps = {
  steps: {
    target: () => HTMLElement | null;
    content: string;
  }[];
  open: boolean;
  onClose: () => void;
};
function WalkThrough({ steps, open, onClose }: WalkThroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  if (!isOpen) return null;
  const currTarget = steps[currentStep].target();
  const position = { left: 0, top: 0 };
  const torchPosition = { left: 0, top: 0, width: 0, height: 0 };

  if (currTarget) {
    currTarget.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "center",
    });
    position.left = currTarget.offsetLeft + currTarget.offsetWidth / 2;
    position.top = currTarget.offsetTop + currTarget.offsetHeight;
    const dimensions = currTarget.getBoundingClientRect();
    torchPosition.left = dimensions.left - 5;
    torchPosition.top = dimensions.top - 5;
    torchPosition.width = dimensions.width + 10;
    torchPosition.height = dimensions.height + 10;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.tour} style={{ ...position }}>
          {steps[currentStep].content}{" "}
          <div>
            <button
              onClick={() =>
                setCurrentStep((prev) => (prev + 1) % steps.length)
              }
            >
              Next
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            >
              close
            </button>
          </div>
        </div>,
        document.body
      )}
      {ReactDOM.createPortal(
        <div className={styles.overlay}>
          <div className={styles.torch} style={{ ...torchPosition }} />
        </div>,
        document.body
      )}
      {/* {ReactDOM.createPortal(
        <div className={styles.spot} style={{ ...torchPosition }} />,
        document.body
      )} */}
    </>
  );
}

export default WalkThrough;
