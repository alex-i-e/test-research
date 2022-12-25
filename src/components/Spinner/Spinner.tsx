import React, { FC } from "react";
import cn from "classnames";

import styles from "./Spinner.module.css";

export enum SPINNER_SIZES {
  s = "S",
  m = "M",
  l = "L",
}
interface Props {
  isRelative?: boolean;
  size?: SPINNER_SIZES;
}
const Spinner: FC<Props> = ({ isRelative = false, size = SPINNER_SIZES.l }) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.relative]: isRelative,
      })}
    >
      <div
        className={cn(styles.spinner, styles[`spinner-${size}`], {
          [styles.relative]: isRelative,
        })}
      />
    </div>
  );
};

export { Spinner };
