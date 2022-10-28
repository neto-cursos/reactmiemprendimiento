import Cookies from 'js-cookie'
import cookie from 'cookie'
import { useLocation, Navigate,useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import RedirectToPage from './RedirectToPage';
import { useDispatch } from 'react-redux';
//let location = useLocation();

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client

    //let location = useLocation();
    //if (! reqCookies) {
    //    return !! Cookies.get('ticket_management_is_user_logged_in')
    //}

    // otherwise get cookie from server
    //return !! cookie.parse(reqCookies).ticket_management_is_user_logged_in
    //(!!) it's short way to cast a variable to be a boolean (true or false) value.
    return !! Cookies.get('ticket_management_is_user_logged_in')
}


export const OpLogIn = () => {
    //const [isAuth,setIsAuth]=useState(false);
    Cookies.set('ticket_management_is_user_logged_in', true, {expires: 86400, sameSite: 'lax'})
    console.log("Se creó el cookie");
    //setIsAuth(true);
    //localStorage.setItem('isAuth',JSON.stringify(true));
    /*return <RedirectToPage pageAdress="\welcome"></RedirectToPage>*/
}

export const logOut = () => {
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        Cookies.remove('ticket_management_is_user_logged_in', {expires: 86400, sameSite: 'lax'})
        console.log("logout exitoso")
        //return navigate("/login")
    }
}