import React, { Component } from 'react'
import BrandLinkText from '../BrandLink/BrandLinkText'
import './Footer.css'
import { v4 as uuid } from "uuid";
import IconFacebook from '../Icons/iconFacebook';
import IconYoutube from '../Icons/iconYoutube';
import IconInstagram from '../Icons/iconInstagram';
import IconWhatsapp from '../Icons/iconWhatsapp';
import IconTwitter from '../Icons/iconTwitter';

const Footer = () => {
    const links = [
        'fbk',
        'Twt',
        'Ins'
    ]
    // <footer className=' bg-bglogotext h-14 p-2 absolute left-0 bottom-0 right-0'>
    return (
        <footer className=' bg-bglogotext h-14 p-2'>
            <div className='container relative justify-between flex items-center'>
                <BrandLinkText classes='text-darkish' />
                {window.innerWidth>920&&<div className='text-xs md:text-2xl'>Fundación Educar para la vida 2022</div>}
                <div className='flex'>
                    <a className="hover:bg-blue-300 rounded-md" href='https://www.facebook.com/Fundaci%C3%B3n-Educar-para-La-Vida-108972277335908'>
                        <IconFacebook></IconFacebook>
                    </a>
                    <a className="hover:bg-green-300 rounded-md" href='https://api.whatsapp.com/send?phone=%3C59172087186%3E'>
                        <IconWhatsapp></IconWhatsapp>
                    </a>
                    <a className="hover:bg-red-400 rounded-md" href='https://www.instagram.com/fundeducarparalavida/'>
                        <IconInstagram></IconInstagram>
                    </a>
                    <a className="hover:bg-sky-400 rounded-md" href='https://twitter.com/FUNDVIDA2'>
                        <IconTwitter></IconTwitter>
                    </a>
                    {/* {links.map(link => (
                        <a key={uuid()} href="/">{link}</a>
                    ))} */}
                </div>
            </div>
            {/*<p>
                React Project
                    </p>*/}
        </footer>
    )
}
export default Footer; 