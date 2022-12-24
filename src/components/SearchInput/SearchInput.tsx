import React, { forwardRef, useImperativeHandle, useRef } from "react";

const SearchInput = forwardRef<{ getInputValue(): string }, unknown>(
  (_, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      getInputValue() {
        return inputRef.current?.value ?? "";
      },
    }));

    return (
      <input ref={inputRef} type="search" placeholder="Search images by text" />
    );
  }
);

export { SearchInput };
