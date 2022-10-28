import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarSesion = () => {
    return (
        <>
            <NavLink className='mr-2 text-xs' to="/login">
                Iniciar Sesión
            </NavLink>
            <NavLink className='mr-2 text-xs' to="/signup">
                Crear Cuenta
            </NavLink>
        </>
    );
}

export default NavbarSesion;
