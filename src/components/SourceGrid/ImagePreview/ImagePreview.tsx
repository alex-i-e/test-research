import React, { FC, useState } from "react";

import { ImageApi } from "../../../services/ImageService/interfaces";
import styles from "./ImagePreview.module.css";

interface Props {
  source: ImageApi;
}
const ImagePreview: FC<Props> = ({ source }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = () => {
    setIsLoaded(true);
  };
  const srcSet = `${source.urls.raw}&w=200&dpr=1 1x, ${source.urls.raw}&w=200&fit=max&q=40&dpr=2 2x`;

  return (
    <figure className={styles.figure} data-testid="image">
      <img
        srcSet={srcSet}
        src={source.urls.thumb}
        className={styles.img}
        alt={source.alt_description}
        title={source.description}
        onLoad={onLoad}
        data-is-loaded={isLoaded}
        data-blur-hash={source.blur_hash}
        loading="lazy"
      />
      {!isLoaded && (
        <div
          className={styles.fallback}
          style={{
            backgroundColor: source.color,
          }}
        />
      )}
    </figure>
  );
};

export { ImagePreview };
