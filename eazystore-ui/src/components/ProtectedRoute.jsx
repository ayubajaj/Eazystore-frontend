import React, { use } from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { useAuth } from '../store/auth-context.jsx';


export default function ProtectedRoute() {
    const {isAuthenticated} = useAuth();
  return  isAuthenticated?<Outlet/>:<Navigate to ="/login"  />;
}
