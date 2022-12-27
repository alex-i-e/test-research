import { ImageService } from "../../services/ImageService/ImageService";
import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
    setIsLoading(true);
    const query = formRef.current?.getSearchValue().trim();
    const data = await ImageService.getAll({
      query,
      page,
    });
    setIsLoading(false);

    if (page === 1 && data.results.length) {
      setIsFirstPageLoaded(true);
    }
    if (page === 1 && !data.results.length) {
      setIsFirstPageLoaded(false);
    }

    if (page === 1) {
      setSources(data.results);
      return;
    }

    setSources(prev => [...prev, ...data.results]);
  };

  const onNewRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    pageRef.current = 1;
    setPage(1);
  };

  const loadNextPage = useCallback(() => {
    if (!pageRef.current) return;

    pageRef.current += 1;
    setPage(pageRef.current);
  }, [setPage]);

  useEffect(() => {
    if (!page) return;

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
  };
};

export { useDataSource };
