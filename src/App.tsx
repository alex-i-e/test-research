import React, { lazy } from "react";
import { Routes } from "react-router-dom";

import "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { AclRoute } from "./routes/AclRoute/AclRoute";
import { Route } from "react-router";

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
                <AclRoute path="/">
                  <Home />
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
