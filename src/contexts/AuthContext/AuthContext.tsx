import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface IAuthContext {
	isAuth: boolean;
	login: string | null;
	setLogin(v: string | null): void;
}

const authContextState: IAuthContext = {
	isAuth: false,
	login: null,
	setLogin: Function,
};

const AuthContext = createContext(authContextState);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [login, setLogin] = useState<string | null>(null);

	const value = useMemo(() => ({
		isAuth: Boolean(login),
		login,
		setLogin,
	}), [login, setLogin])

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext, authContextState };
