import React, { Component, useEffect, useState } from 'react'
import Header from '../components/Forms/Header';
import LoginForm from '../components/Forms/LoginForm';
import ApiAuth from '../Authentication/ApiAuth';
import { logIn } from '../Authentication/UtilsAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = (props) => {

    
/*
        */

/*
    const [email, setEmail] = React.useState('mario@gmail.com');
    const [password, setPassword] = React.useState('marito1234');
    const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);
    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log("HOLIS")
        setAuthError(false);
        setUnknownError(false);
        ApiAuth.get('/sanctum/csrf-cookie')
            .then(response => {
                ApiAuth.post('/webauth/signin', {
                    email: email,
                    password: password
                }).then(response => {
                    if (response.status === 204) {
                        props.login();
                        setToHome(true);
                        console.log("ERROR DESCONOCIDO 204")
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        setAuthError(true);
                        console.log("ERROR DESCONOCIDO 422")
                    } else {
                        console.log("ERROR DESCONOCIDO")
                        setUnknownError(true);
                        console.error(error);
                    }
                });
            });
    }
    /*let navigate = useNavigate();
    if (toHome === true) {
        return (navigate("\"))

    }
    <LoginForm actionForm={signIn} updateForm={updateFormInput} formInputValue={formInput}/>
    */
    return (
        <>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">


                    <Header
                        heading="Ingresa a tu cuenta"
                        paragraph="¿Aún no tiene una cuenta? "
                        linkName="Crear cuenta"
                        linkUrl="/signup"
                    />
                    {/*<LoginForm actionForm={handleSubmit}/>*/}
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}

export default Login;