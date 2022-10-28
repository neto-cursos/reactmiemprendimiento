import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { OpLogIn } from '../../Authentication/UtilsAuth';
import { loginFields } from '../../constants/formFields'
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import Error from '../Error'
import * as yup from "yup";
import { userLogin } from '../../reduxfeatures/Actions/userActions';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const LoginForm = (props) => {
    const { loading, userInfo, error,auth,errores } = useSelector((state) => state.usuarios)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // redirect authenticated user to profile screen
  /*useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
        //navigate('/welcome')
    }
  }, [navigate, userInfo])*/


  
  const schema = yup.object({
    email: yup.string().required().typeError('Debe ingresar un email válido'),
    //password: yup.number().positive().integer().required(),
    password: yup.string().required().typeError('Debe ingresar su password'),
  }).required();
    //for useForm always use register as the name for inputs forms with useForm
    
    const { register, handleSubmit,formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
/**
 * Console log
 */
    console.log("==Login Form==")

    const submitForm = (data) => {
        dispatch(userLogin(data));
    }
    

    return (

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{errores}</Error>}
            {errors.email?.message}
            {errors.password?.message}
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            {...register(field.name)}
                            //handleChange={updateFormInput}
                            //value={register[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            //name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>
            <FormExtra />
            <FormAction action={'submit'} text="Iniciar Sesión" disabled={loading}/>
        </form>
    );
}

export default LoginForm;
