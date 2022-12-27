import React, { FC, useCallback, useRef } from "react";

import { SearchForm } from "./SearchForm/SearchForm";
import { SourceGrid } from "../../components/SourceGrid/SourceGrid";
import { Spinner } from "../../components/Spinner/Spinner";

import { useDataSource } from "./useDataSource";
import { Header } from "./Header/Header";
import styles from "./Home.module.css";

const Home: FC = () => {
  const formRef = useRef<{
    getSearchValue(): string;
  }>(null);
  const { sources, isLoading, pageRef, setPage, onNewRequest } = useDataSource({
    formRef,
  });

  const loadNextPage = useCallback(() => {
    if (!pageRef.current) return;

    pageRef.current += 1;
    setPage(pageRef.current);
  }, [setPage]);

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
        </div>
        <div className={styles.gridWrapper}>
          <SourceGrid sources={sources} loadNextPage={loadNextPage} />
          {isLoading && <Spinner isRelative />}
        </div>
      </main>
    </div>
  );
};

export { Home as default };
