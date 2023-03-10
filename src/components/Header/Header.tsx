import React, { FC } from "react";

import { Button } from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import styles from "./Header.module.css";

const Header: FC = () => {
  const { login, resetLogin } = useAuth();
  const loginText = `Welcome, ${login}!`;

  return (
    <header className={styles.header}>
      <span className={styles.loginText}>{loginText}</span>
      <Button onClick={resetLogin}>Logout</Button>
    </header>
  );
};

export { Header };
