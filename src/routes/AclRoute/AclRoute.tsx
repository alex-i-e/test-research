import React, { FC, PropsWithChildren, Suspense } from "react";

import { useAuth } from "../../contexts/AuthContext/useAuth";
import { Spinner } from "../../components/Spinner/Spinner";

const Login = React.lazy(() => import("../Login/Login"));

const AclRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuth();
  const output = !isAuth ? <Login /> : <>{children}</>;

  return <Suspense fallback={<Spinner />}>{output}</Suspense>;
};

export { AclRoute };
