import { useState } from "react";

import { ImageApi } from "../../../services/ImageService/interfaces";

const BASE_WIDTH = 200;
const getSrcSet = (source: ImageApi) =>
  `${source.urls.raw}&w=${BASE_WIDTH}&dpr=1 1x, ${source.urls.raw}&w=${BASE_WIDTH}&fit=max&q=40&dpr=2 2x`;

const getImageHeight = (source: ImageApi) =>
  ((source.height / source.width) * BASE_WIDTH).toString();

const useImagePreview = (source: ImageApi) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = () => {
    setIsLoaded(true);
  };
  const srcSet = getSrcSet(source);
  const imageHeight = getImageHeight(source);

  return {
    isLoaded,
    imageHeight,
    srcSet,
    onLoad,
  };
};

export { useImagePreview };
