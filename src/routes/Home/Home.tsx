import React, { FC, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import { SearchInput } from '../../components/SearchInput/SearchInput';

const Home: FC = () => {
	const {setLogin} = useAuth();
	const searchRef = useRef<{
		getInputValue(): string;
	}>(null);

	const onLogout = () => {
		setLogin(null);
	};

	const onSearch = () => {
		console.log('getInputValue()=', searchRef.current?.getInputValue());
	};

	return (
		<div>
			Home page
			<button onClick={onLogout} >Logout</button>
			<SearchInput ref={searchRef} />
			<button type="button" onClick={onSearch}>Search</button>
		</div>
	);
};

export { Home as default };
