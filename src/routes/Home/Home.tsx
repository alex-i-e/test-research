import React, { FC, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext/useAuth';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { SourceGrid } from '../../components/SourceGrid/SourceGrid';
import { ImageService } from '../../services/ImageService/ImageService';
import { ImageApi } from '../../services/ImageService/interfaces';

const Home: FC = () => {
	const {setLogin} = useAuth();
	const searchRef = useRef<{
		getInputValue(): string;
	}>(null);
		const [sources, setSources] = useState<ImageApi[]>([]);

	const onLogout = () => {
		setLogin(null);
	};

	const onSearch = async () => {
		console.log('getInputValue()=', searchRef.current?.getInputValue());
		const query = searchRef.current?.getInputValue().trim();
		const data = await ImageService.getAll({
			query
		});

		setSources(data.results);
	};

	return (
		<div>
			Home page
			<button onClick={onLogout} >Logout</button>
			<SearchInput ref={searchRef} />
			<button type="button" onClick={onSearch}>Search</button>
			<SourceGrid sources={sources} />
		</div>
	);
};

export { Home as default };
