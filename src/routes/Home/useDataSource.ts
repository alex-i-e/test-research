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

  const loadDataByPage = async (page: number) => {
    const query = formRef.current?.getSearchValue().trim();
    if (!query) return;

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
  };

  const onNewRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = formRef.current?.getSearchValue().trim();
    if (!query) return;

    pageRef.current = 1;
    setPage(1);
    loadDataByPage(1);
  };

  const loadNextPage = useCallback(() => {
    if (!pageRef.current) return;

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
    if (!page || page === 1) return;

    loadDataByPage(page);
  }, [page]);

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
