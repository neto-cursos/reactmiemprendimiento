import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ApiAuth from '../../Authentication/ApiAuth';
import { logOut } from '../../Authentication/UtilsAuth';
import { signupFields } from '../../constants/formFields'
import FormAction from './FormAction';
import Input from './Input';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');
const SignUpform = () => {
  const [navigate, setNavigate] = useState(false);
  const [formInput, setFormInput] = useState({ name: '', apellido: '',email:'', password:''});
  const updateFormInput = e => {
    e.persist()
    setFormInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    console.log(e.target.name + ":" + e.target.value)
  }

  const crearUsuario = async (e) => {
    e.preventDefault();
    console.log("enviando datos");
    console.log(formInput)
    await ApiAuth().post('/auth/registro', formInput).then(response => {
      console.log(response)
      setNavigate(true);
      logOut();
    })
  }
  if (navigate) {
    //console.log(axios.defaults.headers.common['Authorization'])
    return <Navigate to="/login" />;
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={crearUsuario}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={updateFormInput}
              value={formInput[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
        <FormAction handleSubmit={crearUsuario} text="Registrar Cuenta" />
      </div>

    </form>
  );
}

export default SignUpform;
