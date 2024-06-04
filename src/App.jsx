import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import config from "./config";
import DefaultLayout from "./layouts/DefaultLayout";
import Authenticated from "./pages/Authenticated/Authenticated";
import ForgotPassword from "./pages/Authenticated/ForgotPassword/ForgotPassword";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { superAdminRoutes, classAdminRoutes, trainerRoutes, studentRoutes } from "./routes";

function App() {
  const { token, userDTO } = useSelector((state) => state.auth);
  let routeList = []
  
  switch (userDTO?.roleName) {
    case 'Super Admin':
      routeList = superAdminRoutes
      break;
    case 'Class Admin':
      routeList = classAdminRoutes
      break;
    case 'Trainer':
      routeList = trainerRoutes
      break;
    case 'Student':
      routeList = studentRoutes
      break;
  }
  // console.log()
  return (
    <div className="App">

      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<Authenticated />} />
            <Route
              path={config.routes.forgotpassword}
              element={<ForgotPassword />}
            />
          </>
        ) : (
          routeList.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
