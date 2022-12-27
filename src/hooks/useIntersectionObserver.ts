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
      if (!entries.length) return;

      const intersection = entries[0];
      if (intersection.intersectionRatio !== 1) return;

      loadNextPage();
    };

    let options = {
      root: rootSelector ? document.querySelector(rootSelector) : null,
      rootMargin: "0px",
      threshold: 1,
    };

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector(targetSelector);

    if (!target) return;

    observer.observe(target!);

    return () => {
      if (!target) return;
      observer.unobserve(target);
    };
  }, [isFirstPageLoaded, targetSelector]);
};

export { useIntersectionObserver };
