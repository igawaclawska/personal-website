import { type ReactNode, type MouseEventHandler } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button className={styles.primary} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
