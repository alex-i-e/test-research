import React, { FC } from "react";
import { FallbackProps } from "react-error-boundary";

import { Button } from "../Button/Button";
import styles from "./ErrorFallback.module.css";

const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  const onClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>Something went wrong.</h2>
      <details className={styles.details}>
        {error.message}
        <br />
      </details>
      <Button onClick={onClick}>Refresh page</Button>
    </div>
  );
};

export { ErrorFallback };
