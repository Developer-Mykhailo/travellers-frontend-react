import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuth } from '../../features/auth/store/selectors';

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
