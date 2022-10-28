import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'
import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '../../Authentication/UtilsAuth'
import { setDataFromLocalSave, updateAuth } from '../../reduxfeatures/userSlice'
import BrandLink from '../BrandLink'
import BriefcaseIcon from '../Icons/BriefcaseIcon'
import NavLinks from '../NavLinks'
import './Navbar.css'
import NavbarLogout from './NavbarLogout'
import NavbarSesion from './NavbarSesion'

const Navbar = ({ showLogin}) => {

    /*useEffect(() => {
        window.addEventListener("onload", alertUser);
        return () => {
          window.removeEventListener("onload", alertUser);
        };
      }, []);
      const alertUser = (e) => {
        e.preventDefault();
        dispatch(setDataFromLocalSave());
        console.log("auth from useRedux:");
        console.log(auth);
      };*/
       const { auth, userInfo} = useSelector(state => state.usuarios);
   
      /*useEffect(() => {
        if (userToken) {
            //dispatch(getUserDetails())
            console.log('wiiiii')
        }else
        console.log('wuuuuu')
    }, [userToken])*/
    

    console.log("NavBar .. auth from useRedux:" + auth);
    const userName = userInfo.user_name;
    const userApellido = userInfo.user_apellido;

    const islogged = isLoggedIn();
    console.log("NavBar .. Shows islogged()?:" + islogged)

    return (
        <nav className='font-krona flex justify-between py-2 bg-bglogo text-whitish'>
            {/*brand*/}
            {/*TODO: add colors to icons {text-dark} */}

            <BrandLink>
            </BrandLink>
            <div className='flex items-center flex-col md:flex-row'>
                <NavLinks></NavLinks>
                <div className='flex'>
                    <BriefcaseIcon color="redish"></BriefcaseIcon>
                </div>
            </div>
            <div className='flex items-center flex-col justify-center md:flex-row'>
                {showLogin ? <NavbarLogout userName={userName} userApellido={userApellido}></NavbarLogout>/*<NavLink className='mr-2 text-xs' to="/logout">
                    cerrar sesión*/
                    : <NavbarSesion></NavbarSesion>}

            </div>
            {/*ICONS*/}
            {/*Liked*/}
            {/*Cart*/}
        </nav>
    )
}
export default Navbar; 