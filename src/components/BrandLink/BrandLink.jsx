import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './BrandLink.css'
import logofundacion from './../../Images/logofundvidatransp.png';
const BrandLink = ({classes=''}) => {
    return (
        <Link to="/" className={`md:text-2xl font-krona ${classes}`}>
            <img className='bg-bglogo object-scale-down h-14 pl-2' src={logofundacion} alt="logoFundación" />
            {/* FundVida */}
        </Link>
    )
    
}
export default BrandLink; 