import React, { Suspense } from 'react';
import { RequireAuth } from 'react-auth-kit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout/MainLayout';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth loginPath="/auth/login">
                <MainLayout />
              </RequireAuth>
            </Suspense>
          }
        >
          <Route path="/" element={<MainScreen />}></Route>
        </Route>
        <Route
          path={'/auth'}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route path="login" element={<LoginScreen />}></Route>
          {/* <Route path="verify" element={<UserVerifyScreen />}></Route> */}
          {/* <Route path="reset" element={<ForgotPasswordScreen />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
