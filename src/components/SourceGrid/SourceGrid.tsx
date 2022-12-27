import React, { FC } from "react";

import styles from "./SourceGrid.module.css";
import { ImagePreview } from "./ImagePreview/ImagePreview";
import { ImageApi } from "../../services/ImageService/interfaces";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface Props {
  isFirstPageLoaded: boolean;
  sources: ImageApi[];
  loadNextPage(): void;
}
const SourceGrid: FC<Props> = ({
  isFirstPageLoaded,
  sources,
  loadNextPage,
}) => {
  useIntersectionObserver({
    isFirstPageLoaded,
    targetSelector: `.${styles.observerTarget}`,
    loadNextPage,
  });

  if (!sources.length)
    return <div className={styles.emptyList}>Nothing to show yet.</div>;

  return (
    <>
      <div className={styles.wrapper}>
        {sources.map(item => (
          <ImagePreview key={item.id} source={item} />
        ))}
      </div>
      <div className={styles.observerTarget} />
    </>
  );
};

export { SourceGrid };
