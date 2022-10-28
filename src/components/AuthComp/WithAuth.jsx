import React, { useEffect } from 'react'
import { isLoggedIn } from '../../Authentication/UtilsAuth'
import redirectTo from '../../Authentication/RedirectToPage'
import { useNavigate } from 'react-router-dom'
import { useLocation, Navigate } from "react-router-dom";
//import { useAuth } from "../hooks/Auth";

/*export function RequireAuth({ children }: { children: JSX.Element }) {
  let { user } = useAuth();
  

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}*/

export default function withAuth({Component}) {
    
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    AuthComponent.getInitialProps = (context) => {
        const isUserLoggedIn = isLoggedIn(context?.req?.headers?.cookie || '')

        if (!isUserLoggedIn) {
            //const shouldRedirect = true;
            
            //redirectTo('/login', context)
            console.log('esta logueado')
        }

        return { user: { isLoggedIn: isUserLoggedIn } }
    }

    return AuthComponent
    //let location = useLocation();
}