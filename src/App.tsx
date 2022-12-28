import React, { lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { AclRoute } from "./routes/AclRoute/AclRoute";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";

const Home = lazy(() => import("./routes/Home/Home"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <AclRoute>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Home />
                  </ErrorBoundary>
                </AclRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
