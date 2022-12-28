import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ImageService } from "../../services/ImageService/ImageService";
import { ImageApi } from "../../services/ImageService/interfaces";

interface Props {
  formRef: MutableRefObject<{ getSearchValue(): string } | null>;
}
const useDataSource = ({ formRef }: Props) => {
  const [sources, setSources] = useState<ImageApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number | null>(null);
  const pageRef = useRef<number | null>(null);
  const [isFirstPageLoaded, setIsFirstPageLoaded] = useState(false);

  const loadDataByPage = useCallback(
    async (page: number) => {
      const query = formRef.current?.getSearchValue().trim() ?? "";
      if (query.length === 0) return;

      setIsLoading(true);
      const data = await ImageService.getAll({
        query,
        page,
      });
      setIsLoading(false);

      if (page !== 1) {
        setSources(prev => [...prev, ...data.results]);

        return;
      }

      setIsFirstPageLoaded(Boolean(data.results.length));
      setSources(data.results);
    },
    [formRef]
  );

  const onNewRequest = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const query = formRef.current?.getSearchValue().trim() ?? "";
      if (query.length === 0) return;

      pageRef.current = 1;
      setPage(1);
      loadDataByPage(1);
    },
    [formRef, loadDataByPage]
  );

  const loadNextPage = useCallback(() => {
    if (pageRef.current === null) return;

    pageRef.current += 1;
    setPage(pageRef.current);
  }, [setPage]);

  const resetSources = useCallback(() => {
    pageRef.current = null;
    setPage(null);
    setSources([]);
    setIsLoading(false);
    setIsFirstPageLoaded(false);
  }, []);

  useEffect(() => {
    if (page === null || page === 1) return;

    loadDataByPage(page);
  }, [page, loadDataByPage]);

  return {
    isFirstPageLoaded,
    sources,
    page,
    pageRef,
    isLoading,
    setPage,
    onNewRequest,
    loadNextPage,
    resetSources,
  };
};

export { useDataSource };
