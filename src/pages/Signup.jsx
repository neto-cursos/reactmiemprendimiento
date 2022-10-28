import Header from "../components/Forms/Header";
import SignUpForm from "../components/Forms/SignUpForm";
import React from 'react';

const Signup = () => {
    return (
        <>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">

                    <Header
                        heading="Crear nueva Cuenta"
                        paragraph="¿Ya esta registrado? "
                        linkName="Iniciar Sesión"
                        linkUrl="/login"
                    />
                    <SignUpForm />
                </div>
            </div>
        </>
    );
}

export default Signup;
