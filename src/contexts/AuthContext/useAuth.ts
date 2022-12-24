import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
	const useAuthContext = useContext(AuthContext);

	return useAuthContext;
};

export { useAuth };
