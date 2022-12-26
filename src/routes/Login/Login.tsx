import React, { FC, FormEvent, useRef } from "react";

import { useAuth } from "../../contexts/AuthContext/useAuth";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import styles from "./Login.module.css";

enum LoginFields {
  login = "login",
}

const Login: FC = () => {
  const { setLogin } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const login = formData.get(LoginFields.login) as string;
    setLogin(login);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Enjoy image searching...</h1>
      <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
        <label className={styles.inputWrapper}>
          <span className={styles.label}>Name</span>
          <Input
            type="text"
            name={LoginFields.login}
            placeholder={"Please type your name"}
            required
            autoFocus
          />
        </label>
        <Button cssClass={styles.submit} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export { Login as default };
