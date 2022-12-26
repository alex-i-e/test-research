import React, {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./SearchForm.module.css";

enum SearchFields {
  search = "search",
}

const SearchForm = forwardRef<
  { getSearchValue(): string },
  {
    onSearch(e: FormEvent<HTMLFormElement>): Promise<void>;
  }
>(({ onSearch }, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({
    getSearchValue() {
      if (!formRef.current) return "";

      const formData = new FormData(formRef.current);
      const search = formData.get(SearchFields.search) as string;

      return search ?? "";
    },
  }));

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSearch}>
      <label htmlFor={SearchFields.search}>
        <Input
          type="search"
          placeholder="Please type text"
          autoFocus
          name={SearchFields.search}
          required
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
});

export { SearchForm };
