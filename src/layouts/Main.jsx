//import React, { Fragment,Component } from 'react'
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Main = ({children}) => {
    return (
        //NAVBAR
        //CONTENT
        //FOOTER
        //<Fragment>
        <>
            <Navbar />


            <div className='container mx-auto' >
                {/*<p>Main</p>
                {children}
    <p>niña de sus ojos</p>*/}
    {children}
            </div>
            <Footer/>
        </>
        //</Fragment>
    );
}
export default Main;
