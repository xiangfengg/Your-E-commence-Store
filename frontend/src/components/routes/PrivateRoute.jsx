import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  // the useSelector hook from react-redux is used to access the userInfo property from the application state, specifically the auth slice of the state.
  // The userInfo property represents the user authentication information, indicating whether the user is logged in or not.
  const { userInfo } = useSelector((state) => state.auth);
  // If userInfo exists, it means the user is authenticated, and the component renders the Outlet component from react-router-dom. The Outlet component renders the child routes nested under the PrivateRoute.
  //replace prop replace the current entry in history stack  if the user tries to go back after logging in, they won't be taken back to the page that required authentication
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
