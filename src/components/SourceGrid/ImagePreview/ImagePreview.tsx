import React, { FC } from "react";

import { ImageApi } from "../../../services/ImageService/interfaces";
import styles from "./ImagePreview.module.css";
import { useImagePreview } from "./useImagePreview";

interface Props {
  source: ImageApi;
}

const ImagePreview: FC<Props> = ({ source }) => {
  const { isLoaded, imageHeight, srcSet, onLoad } = useImagePreview(source);

  return (
    <figure className={styles.figure} data-testid="image">
      <img
        data-testid={source.id}
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
          // @ts-ignore
          "--image-height": `${imageHeight}px`,
        }}
      />
      {!isLoaded && (
        <div
          data-testid={`bg-${source.id}`}
          className={styles.fallback}
          style={{
            // @ts-ignore
            "--image-height": `${imageHeight}px`,
            "--image-bg-color": source.color,
          }}
        />
      )}
    </figure>
  );
};

export { ImagePreview };
