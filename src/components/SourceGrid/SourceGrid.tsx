import React, { FC } from "react";

import styles from "./SourceGrid.module.css";
import { ImagePreview } from "./ImagePreview/ImagePreview";
import { ImageApi } from "../../services/ImageService/interfaces";

interface Props {
  sources: ImageApi[];
}
const SourceGrid: FC<Props> = ({ sources }) => {
  return (
    <div className={styles.wrapper}>
      {sources.map(item => (
        <ImagePreview key={item.id} source={item} />
      ))}
    </div>
  );
};

export { SourceGrid };
