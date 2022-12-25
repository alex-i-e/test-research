import React, {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "../../routes/Home/Home.module.css";

enum SearchFields {
  search = "search",
}

const SearchInput = forwardRef<
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
        Search by text:
        <input
          type="search"
          placeholder="Please type text"
          autoFocus
          name={SearchFields.search}
          required
          list="searchOptions"
        />
      </label>
      <input type="submit" value="Search" />
      <datalist id="searchOptions">
        <option value="cat" />
        <option value="dog" />
        <option value="apple" />
        <option value="orange" />
      </datalist>
    </form>
  );
});

export { SearchInput };
