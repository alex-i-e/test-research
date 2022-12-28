import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./SearchForm.module.css";

enum SearchFields {
  search = "search",
}

interface RefProps {
  getSearchValue(): string;
}
interface ComponentProps {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onSearch(e: FormEvent<HTMLFormElement>): Promise<void>;
  isLoading: boolean;
}
const SearchForm = forwardRef<RefProps, ComponentProps>(
  ({ onInputChange, onSearch, isLoading }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSearchChanged, setIsSearchChanged] = useState(false);

    const handleOnChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setIsSearchChanged(true);
        onInputChange(e);
      },
      [setIsSearchChanged, onInputChange]
    );
    const handleOnSearch = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        if (!isSearchChanged) return;

        onSearch(e);
        setIsSearchChanged(false);
      },
      [isSearchChanged, onSearch, setIsSearchChanged]
    );

    useImperativeHandle(ref, () => ({
      getSearchValue() {
        if (!formRef.current) return "";

        const formData = new FormData(formRef.current);
        const search = formData.get(SearchFields.search) as string;

        return search ?? "";
      },
    }));

    return (
      <form ref={formRef} className={styles.form} onSubmit={handleOnSearch}>
        <label htmlFor={SearchFields.search}>
          <Input
            type="search"
            placeholder="Please type text"
            autoFocus
            name={SearchFields.search}
            required
            onChange={handleOnChange}
          />
        </label>
        <Button type="submit" isLoading={isLoading} disabled={!isSearchChanged}>
          Search
        </Button>
      </form>
    );
  }
);

export { SearchForm };
