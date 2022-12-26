import React, { FC } from "react";

import styles from "./SourceGrid.module.css";
import { ImagePreview } from "./ImagePreview/ImagePreview";
import { ImageApi } from "../../services/ImageService/interfaces";

interface Props {
  sources: ImageApi[];
}
const SourceGrid: FC<Props> = ({ sources }) => {
  if (!sources.length)
    return <div className={styles.emptyList}>Nothing to show yet.</div>;

  return (
    <div className={styles.wrapper}>
      {sources.map(item => (
        <ImagePreview key={item.id} source={item} />
      ))}
    </div>
  );
};

export { SourceGrid };
