import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRout';
import { SharedLayout } from './SharedLayout';
import { refreshUser } from 'Redux/auth/operations';
import { useAuth } from 'hooks';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SignInPage = lazy(() => import('../pages/SingInPage'));
const WellcomPage = lazy(() => import('../pages/WelcomePage'));
const MainPage = lazy(() => import('../pages/MainPage'));


export const App = () => {
	const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
	return isRefreshing ? (
	<span>Refreshing user...</span>
	) :(
    <Routes>
      <Route path="/" element={<SharedLayout />}>
				<Route index element={<WellcomPage/>} />
				<Route path="/register" element={
					<RestrictedRoute
            redirectTo="/"
            component={<RegisterPage />}
          />} />
				<Route path="/signin" element={
					<RestrictedRoute
            redirectTo="/main"
            component={<SignInPage/>}
					/>} />
				<Route
					path="/main"
					element={
						<PrivateRoute
							redirectTo='/signin'
							component={<MainPage />} />
					}/>
      </Route>
    </Routes>
  );
};
