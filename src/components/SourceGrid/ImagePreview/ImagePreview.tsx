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
  const imageHeight = (source.height / source.width) * 200;

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
        style={{
          "--image-height": `${imageHeight}px`,
        }}
      />
      {!isLoaded && (
        <div
          className={styles.fallback}
          style={{
            "--image-height": `${imageHeight}px`,
            "--image-bg-color": source.color,
          }}
        />
      )}
    </figure>
  );
};

export { ImagePreview };
