import React, { FC, PropsWithChildren, Suspense } from 'react';
import { RouteProps } from 'react-router';

import { useAuth } from '../../contexts/AuthContext/useAuth';
import { Spinner } from '../../components/Spinner/Spinner';

const Login = React.lazy(() => import('../Login/Login'));

const AclRoute: FC<PropsWithChildren & RouteProps> = ({ children }) => {
	const {isAuth} =  useAuth();
	const output = !isAuth ? <Login /> : <>{children}</>

	return <Suspense fallback={<Spinner />}>{output}</Suspense>
		;
};

export { AclRoute };
