import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ApiAuth from '../../Authentication/ApiAuth';
import { emprendimientoFields } from '../../constants/formFields'
import { addNewEmpr, resetEmprendActiva } from '../../reduxfeatures/emprendSlice';
import FormAction from './FormAction';
import Input from './Input';

const fields = emprendimientoFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');
const EmprendimientoForm = () => {
    const [emprId, setEmprId] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const [formInput, setFormInput] = useState({ id: '', empr_nomb: '', empr_rubro: 'comercial', empr_tipo: 'Producto' });
    const dispatch = useDispatch();
    const updateFormInput = e => {
        e.persist()
        setFormInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        console.log(e.target.name + ":" + e.target.value)
    }

    useLayoutEffect(() => {
        
        dispatch(resetEmprendActiva());
        //console.log("LOLOl:"+aux1.user_id)
    }, []);
    useEffect(()=>{
        const aux1 = JSON.parse(localStorage.getItem('usr_dt'));
        setFormInput({ ...formInput, id: aux1.user_id })
    },[])
    const emprendimientos = useSelector(state => state.emprendimientos);
    const crearEmpr =  (e) => {
        e.preventDefault();
        console.log("enviando datos");
        console.log(formInput)
        dispatch(addNewEmpr(formInput))

    }
    useEffect(() => {
        if (emprendimientos.errores.length === 0 && emprendimientos.empr_id_activo !== '') {
            setEmprId(emprendimientos.empr_id_activo)
            dispatch(resetEmprendActiva());
            setNavigate(true);
        }
    }, [emprendimientos]);
    
    if (navigate) {
        //console.log(axios.defaults.headers.common['Authorization'])
        return <Navigate to={`/emprendimiento/${emprId}`} />;
    }
    return (
        <form className="mt-8 space-y-6" onSubmit={crearEmpr}>
            <div className="">
                {
                    emprendimientos.errores.length !== 0 && <span className='text-red-700'>{ emprendimientos.errores.find(index => index.id === 'empr_nomb')?'Nombre de emprendimiento ya registrado, elija otro por favor':''}</span>}
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            onChange={updateFormInput}
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
                <label className='py-3'>Rubro:</label>
                <select
                    className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    name="empr_rubro" defaultValue={'Comercial'} onChange={updateFormInput}
                >
                    <optgroup label="Rubro al que pertenece"></optgroup>
                    <option>Comercio</option>
                    <option>Industrial</option>
                    <option>Online</option>
                    <option>Comercial</option>
                </select>
                <label className='relative block py-3'>Tipo:</label>
                <div className="flex flex-row">

                    <div className="flex items-center mr-4">
                        <input defaultChecked id="purple-radio" type="radio" value="Producto" name="empr_tipo" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />
                        <label htmlFor="purple-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Producto</label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input id="teal-radio" type="radio" value="Servicio" name="empr_tipo" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={updateFormInput} />
                        <label htmlFor="teal-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700">Servicio</label>
                    </div>
                </div>
                <FormAction handleSubmit={crearEmpr} text="Registrar Emprendimiento" />
            </div>

        </form>
    );
}

export default EmprendimientoForm;
