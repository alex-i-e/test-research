import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound: FC = () => {
  return (
    <main className={styles.wrapper}>
      <p className={styles.message}>Page not found</p>
      <Link to={"/"}>Go Home</Link>
    </main>
  );
};

export { NotFound as default };
