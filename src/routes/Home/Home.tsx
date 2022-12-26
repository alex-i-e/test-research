import React, { FC, useRef } from "react";

import { SearchForm } from "./SearchForm/SearchForm";
import { SourceGrid } from "../../components/SourceGrid/SourceGrid";
import { Spinner } from "../../components/Spinner/Spinner";
import { Button } from "../../components/Button/Button";

import { useDataSource } from "./useDataSource";
import { Header } from "./Header/Header";
import styles from "./Home.module.css";

const Home: FC = () => {
  const formRef = useRef<{
    getSearchValue(): string;
  }>(null);
  const { sources, page, isLoading, setPage, onNewRequest } = useDataSource({
    formRef,
  });

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.searchSection}>
          <SearchForm
            ref={formRef}
            onSearch={onNewRequest}
            isLoading={isLoading}
          />
          <Button onClick={() => setPage((page ?? 0) + 1)}>Next</Button>
        </div>
        <div className={styles.gridWrapper}>
          <SourceGrid sources={sources} />
          {isLoading && <Spinner isRelative />}
        </div>
      </main>
    </div>
  );
};

export { Home as default };
