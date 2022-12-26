import React, { FC, InputHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Input.module.css";

const Input: FC<
  InputHTMLAttributes<HTMLInputElement> & { cssClass?: string }
> = ({ cssClass, ...props }) => {
  return (
    <input
      className={cn(styles.input, cssClass)}
      autoComplete="off"
      {...props}
    />
  );
};

export { Input };
