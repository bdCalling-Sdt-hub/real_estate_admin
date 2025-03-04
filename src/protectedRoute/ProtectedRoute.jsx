import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../page/redux/features/auth/authSlice';


const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.logInUser);
    const { pathname } = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ path: pathname }} />;
    }

    function decodeJWT(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format");
            }

            const payload = JSON.parse(atob(parts[1]));
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                dispatch(logout()); 
                return null;
            }

            console.log(payload)
            return payload;
            
        } catch (error) {
            console.error("JWT Error:", error.message);
            dispatch(logout());
            return null;
        }
    }
    decodeJWT(token);

    return children;
};

export default ProtectedRoute;
