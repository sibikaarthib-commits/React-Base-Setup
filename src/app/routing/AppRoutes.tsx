import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeOneRoutes } from '../ui/themes/theme-one';
import { ThemeTwoRoutes } from '../ui/themes/theme-two';
import { ThemeThreeRoutes } from '../ui/themes/theme-three';
import { Login } from '../ui/login-pages/Login';
import { useAppSelector } from '../shared/hooks/useRedux';
import { selectAuthUser } from '../features/auth/authSlice';
import { appConfig } from '../shared/appConfig/appConfig';
import type { BrandKey } from '../ui/themes/theme';

const routesByBrand: Record<BrandKey, React.ReactElement> = {
  dominos: ThemeOneRoutes,
  wineconnection: ThemeTwoRoutes,
  kfc: ThemeThreeRoutes,
};

export const AppRoutes: React.FC = () => {
  const user = useAppSelector(selectAuthUser);
  const brand = appConfig.brand;
  const BrandRoutes = routesByBrand[brand];

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      {BrandRoutes}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
