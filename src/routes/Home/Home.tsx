import React, { FC, FormEvent, useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext/useAuth";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SourceGrid } from "../../components/SourceGrid/SourceGrid";
import { ImageService } from "../../services/ImageService/ImageService";
import { ImageApi } from "../../services/ImageService/interfaces";

import styles from "./Home.module.css";
import { Spinner } from "../../components/Spinner/Spinner";

const Home: FC = () => {
  const { login, setLogin } = useAuth();
  const formRef = useRef<{
    getSearchValue(): string;
  }>(null);
  const [sources, setSources] = useState<ImageApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = () => {
    setLogin(null);
  };

  const onSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const query = formRef.current?.getSearchValue().trim();
    const data = await ImageService.getAll({
      query,
    });

    setIsLoading(false);
    setSources(data.results);
  };

  const loginText = `Hello, ${login}!`;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.loginText}>{loginText}</span>
        <button className={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </header>
      <main className={styles.main}>
        <div className={styles.searchSection}>
          <SearchInput ref={formRef} onSearch={onSearch} />
        </div>
        <div>
          <SourceGrid sources={sources} />
          {isLoading && <Spinner />}
        </div>
      </main>
    </div>
  );
};

export { Home as default };
