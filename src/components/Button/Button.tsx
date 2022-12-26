import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface Props {
  cssClass?: string;
  isLoading?: boolean;
}
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
  cssClass,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, cssClass)}
      disabled={isLoading}
      {...props}
    />
  );
};

export { Button };
