import React, { FC, FormEvent, useRef } from 'react';

import { useAuth } from '../../contexts/AuthContext/useAuth';

enum LoginFields {
	login = 'login',
}

const Login: FC = () => {
	const { setLogin } = useAuth();
	// @todo: expose only submit method
	const formRef = useRef<HTMLFormElement>(null);

	const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		const login = formData.get(LoginFields.login) as string;
		setLogin(login)
	}

	return (
		<div>
			Login Page
			<form ref={formRef}>
				<label>Name</label>
				<input type="text" name={LoginFields.login} placeholder={'Please type user name'} autoFocus />
				<button type="submit" onClick={onSubmit} />
			</form>
		</div>
	);
};

export { Login as default };
