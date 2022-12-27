import React, { FC } from "react";

import styles from "./SourceGrid.module.css";
import { ImagePreview } from "./ImagePreview/ImagePreview";
import { ImageApi } from "../../services/ImageService/interfaces";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface Props {
  sources: ImageApi[];
  loadNextPage(): void;
}
const SourceGrid: FC<Props> = ({ sources, loadNextPage }) => {
  useIntersectionObserver({
    targetSelector: `.${styles.observerTarget}`,
    loadNextPage,
  });

  if (!sources.length)
    return <div className={styles.emptyList}>Nothing to show yet.</div>;

  return (
    <div className={styles.wrapper}>
      {sources.map(item => (
        <ImagePreview key={item.id} source={item} />
      ))}
      <div className={styles.observerTarget} />
    </div>
  );
};

export { SourceGrid };
