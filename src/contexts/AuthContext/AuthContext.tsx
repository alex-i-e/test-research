import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IAuthContext {
  isAuth: boolean;
  login: string | null;
  setLogin(v: string | null): void;
  resetLogin(): void;
}

const authContextState: IAuthContext = {
  isAuth: false,
  login: null,
  setLogin: Function,
  resetLogin: Function,
};

const LOGIN_KEY = "login;";

const AuthContext = createContext(authContextState);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const sessionStorageLogin = window.sessionStorage.getItem(LOGIN_KEY);
  const setSessionStorageLogin = useCallback((v: string | null) => {
    window.sessionStorage.setItem(LOGIN_KEY, v ?? "");
  }, []);
  const [login, setLogin] = useState<string | null>(sessionStorageLogin);

  useEffect(() => {
    setSessionStorageLogin(login);
  }, [login, setSessionStorageLogin]);

  const value = useMemo(
    () => ({
      isAuth: Boolean(login),
      login,
      setLogin,
      resetLogin: () => setLogin(null),
    }),
    [login, setLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, authContextState };
