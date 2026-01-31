import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.userState.user);

  if (!user) return <Navigate to="/login" />; // not logged in
  if (role && user.role !== role) return <Navigate to="/" />; // role restriction

  return children;
};

export default ProtectedRoute;
