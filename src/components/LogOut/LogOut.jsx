import id from 'date-fns/esm/locale/id/index.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import ApiAuth from '../../Authentication/ApiAuth';

import { isLoggedIn, logOut } from '../../Authentication/UtilsAuth';
import { logOutSession } from '../../reduxfeatures/Actions/userActions';
import { getauth, logout, updateAuth, updateLoading } from '../../reduxfeatures/userSlice';
//import { useAuth } from "../hooks/Auth";

//({children})
const LogOut = ({children }) => {
  const navigate = useNavigate();
  
  //let { user } = isLoggedIn();
  const {loading}=useSelector(state=>state.usuarios);
  //const usuarios = useSelector(state => state.usuarios);

  const auth = useSelector(getauth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLogOut, setIsLogOut] = useState(false);
  const [isAuth, setIsAuth] =useState(auth?auth:false);
  const [redirect, setRedirect] = useState(false);
  console.log("ISAUTH");
  console.log(isAuth);
  useEffect(() => {
    console.log('Entró usuarioAuth');
    console.log(auth);

    if (isAuth === false) {
      dispatch(logOutSession());
      console.log("AUTH FALSE logout")
       logOut();
       //window.location.reload();
     }
     return setIsLogOut(true)

  }, [isAuth]);


  // useEffect(() => {
  //   if (isAuth === true)
  //     setIsLogOut(true);
  // }, [isAuth]);

  useEffect(() => {
    // setIsAuth(false);
    localStorage.clear();
    // console.log("localstorage");
    // console.log(localStorage);
     
    // console.log('Entró dispatch logoutSession');
     setIsAuth(false);
    //dispatch(updateAuth(false));

  }, []);

  useEffect(() => {
      // window.location.reload();
      
      if(isLogOut===true){
        console.log("WAIIT")
        window.location.reload();
        //navigate(`/login`);
      }
      
  }, [isLogOut]);

//   useEffect(() => {
//     if (redirect === true)
//         navigate(`/login`);
// }, [redirect])


  return isLogOut && <Navigate to="/login" state={{ from: location }} replace />;
  //return !auth && isAuth && <Navigate to="/login" state={{ from: location }} replace />;
  //return <></>
}

export default LogOut;