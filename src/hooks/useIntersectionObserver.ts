import { useEffect } from "react";

interface Props {
  isFirstPageLoaded: boolean;
  rootSelector?: string;
  targetSelector: string;
  loadNextPage(): void;
}
const useIntersectionObserver = ({
  isFirstPageLoaded,
  rootSelector,
  targetSelector,
  loadNextPage,
}: Props) => {
  useEffect(() => {
    if (!isFirstPageLoaded) return;

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      if (entries.length === 0) return;

      const intersection = entries[0];
      if (intersection.intersectionRatio !== 1) return;

      loadNextPage();
    };

    const root =
      rootSelector !== undefined ? document.querySelector(rootSelector) : null;
    const options = {
      root,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(targetSelector);

    if (!target) return;

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [isFirstPageLoaded, targetSelector]);
};

export { useIntersectionObserver };
