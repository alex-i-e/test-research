import React, { FC, useRef } from "react";

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
  const {
    isFirstPageLoaded,
    sources,
    isLoading,
    onNewRequest,
    loadNextPage,
    resetSources,
  } = useDataSource({
    formRef,
  });

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.searchSection}>
          <SearchForm
            ref={formRef}
            isLoading={isLoading}
            onSearch={onNewRequest}
            onInputChange={resetSources}
          />
        </div>
        <div className={styles.gridWrapper}>
          <SourceGrid
            isFirstPageLoaded={isFirstPageLoaded}
            sources={sources}
            loadNextPage={loadNextPage}
          />
          {isLoading && <Spinner isRelative />}
        </div>
      </main>
    </div>
  );
};

export { Home as default };
