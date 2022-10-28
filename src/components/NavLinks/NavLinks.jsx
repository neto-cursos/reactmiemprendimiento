import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
    const LINKS=[
        {
            path:'/',
            name:'inicio'
        },
        {
            path:'/ejemplos',
            name:'ejemplos'
        },
        {
            path:'/tutoriales',
            name:'tutoriales'
        },
    ]

    
    return (
        <>
        {LINKS.map((link,index)=>(
            <NavLink className='hover:text-red-900 lowercase md:mr-4 mr-1 text-xs md:text-sm pt-1' to={`${link.path}`} key={`${link.name}-${index}`}>
            {link.name}
            </NavLink>
        ))}
        <a className=' hover:text-red-900 lowercase mr-2 md:mr-4 text-xs md:text-sm pt-1' href='http://educarparalavida.org.bo/web/Inicio.html'>Soporte</a>
            
                {/*<NavLink className='mr-4 text-sm pt-1' to="/ejemplos">
                    Ejemplos
                </NavLink>
                <NavLink className='mr-4 text-sm pt-1' to="/tutoriales">
                    Tutoriales
                </NavLink>
                <NavLink className='mr-4 text-sm pt-1' to="/soporte">
                    Soporte
                </NavLink>*/}
            
        </>
    );
}

export default NavLinks;
