import React from 'react';
import EmprendimientoForm from '../components/Forms/EmprendimientoForm';
import Header from '../components/Forms/Header';

const RegisterEmprendimiento = () => {
    return (
        <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Iniciar Emprendimiento"
                    paragraph="Registre su idea de emprendimiento"
                    linkName=""
                    linkUrl=""
                />
                {/*<LoginForm actionForm={handleSubmit}/>*/}
                <EmprendimientoForm></EmprendimientoForm>
            </div>
        </div>
    </>
    );
}

export default RegisterEmprendimiento;
