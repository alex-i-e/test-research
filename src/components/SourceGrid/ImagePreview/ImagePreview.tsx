import React, { FC } from "react";
import { ImageApi } from "../../../services/ImageService/interfaces";

import styles from "./ImagePreview.module.css";

interface Props {
  source: ImageApi;
}
const ImagePreview: FC<Props> = ({ source }) => {
  return (
    <figure className={styles.figure}>
      <img
        className={styles.img}
        src={source.urls.thumb}
        alt={source.alt_description}
        title={source.description}
      />
    </figure>
  );
};

export { ImagePreview };
