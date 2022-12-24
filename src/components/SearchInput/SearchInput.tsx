import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const SearchInput = forwardRef((props, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);
	useImperativeHandle(ref, () => ({
		getInputValue() {
			console.log('inputRef.current=', inputRef.current);
			return inputRef.current?.value ?? '';
		}
	}))

	return <input ref={inputRef} type="search" placeholder="Search images by text" />
});

export { SearchInput };
