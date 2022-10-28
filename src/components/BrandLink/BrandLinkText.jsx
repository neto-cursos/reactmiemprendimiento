import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './BrandLink.css'
import logofundacion from './../../Images/logofundvidatransp.png';
const BrandLinkText = ({classes=''}) => {
    return (
        <Link to="/" className={`text-2xl font-krona ${classes}`}>
            FundVida
        </Link>
    )
    
}
export default BrandLinkText; 