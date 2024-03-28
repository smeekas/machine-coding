import styles from "./Box.module.css";

type BoxProps = {
  onClick: () => void;
  isActive: boolean;
  shouldDisplay: boolean;
};
function Box({ onClick, isActive, shouldDisplay }: BoxProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.box} ${isActive ? styles.active : ""} ${
        !shouldDisplay ? styles.hide : ""
      }`}
    ></div>
  );
}

export default Box;
