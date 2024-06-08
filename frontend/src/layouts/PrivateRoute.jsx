import {Navigate} from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({children}) => {
    const { isLoggedIn, role }=useAuthStore((state) => ({ isLoggedIn: state.isLoggedIn, role: state.role,}));
    // return loggedIn ? <>{children}</> : <Navigate to ='/Dashboard/' />;
 
    return !isLoggedIn ? ( <Navigate to='/login' />  
       ): role === 'student' ? ( <Navigate to='/student/dashboard' /> 
       ): role === 'teacher' ? ( <Navigate to='/instuctor/dashboard' /> 
       ): ( <>{children}</>); 
    };

export default PrivateRoute;