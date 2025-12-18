import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeOneRoutes } from './theme/themeOne';
import { ThemeTwoRoutes } from './theme/themeTwo';
import { ThemeThreeRoutes } from './theme/themeThree';
import { Login } from './theme/commonLogin/Login';
import { useAppSelector } from '../shared/hooks/useAppDispatch';
import { selectAuthUser } from '../features/auth/authSlice';


const routesByBrand = {
  layoutOne: ThemeOneRoutes,
  layoutTwo: ThemeTwoRoutes,
  layoutThree: ThemeThreeRoutes,
} as const;


export const AppRoutes: React.FC = () => {
  // const { brand } = useAppSelector(selectBranding);
  const user = useAppSelector(selectAuthUser);

  // if (!brand) return null;

  const BrandRoutes = routesByBrand['layoutTwo']; // Replace 'layoutTwo' with dynamic brand when available

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
