import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiAuth from '../Authentication/ApiAuth';

const SecondMenu = () => {
    const [userData, setUserData] = useState({
        user_name: '',
        user_apellido: '',
        user_id: '',
        isAuth: false,
    })
    const [datos, setDatos] = useState({
        empr_id: ''
    })
    
    const { empr_id } = useParams();
    console.log("empr_id:" + empr_id)

    const [emprNomb, setEmprNomb] = useState('');

    const query = async () => {

        await ApiAuth().post('/queryempr', datos).then(response => {
        console.log(JSON.stringify(datos))
        console.log("SecondMenu Response:")
        console.log(response)
        if(response.status===201)
        setEmprNomb(response.data['empr_nomb']);
        
    })
}
    useEffect(() => {
        if (localStorage.getItem('usr_dt')) {
            const getData = JSON.parse(localStorage.getItem('usr_dt'));
            setUserData({
                ...userData,
                user_name: getData.user_name,
                user_apellido: getData.user_apellido,
                user_id: getData.user_id,
                auth: getData.auth,
            })
            console.log("userData:" + userData.user_name);
        }
    }, []);

    /*setUserData({
        ...userData,
        user_name: getData.user_name,
        user_apellido: getData.user_apellido,
        user_id: getData.user_id,
        isAuth: getData.isAuth,
    })
    console.log("userData:" + userData.user_name);
}   */
    useEffect(() => {
        setDatos({ ...datos, empr_id: empr_id })
        console.log("entrouseeffect1:" + datos.empr_id)
        
    }, [empr_id]);

    useEffect(()=>{
        console.log("secondmenu datosuseeffect:" + datos.empr_id)
        query();
    },[datos])

    useEffect(()=>{
        console.log("secondmenu emprNombuseeffect:" + emprNomb)
    },[emprNomb])
    /*useEffect(() => {
        console.log("useEToken---"+localStorage.getItem('bearertoken'));
        query();
    }, [empr_id]);*/

    

    // min-h-full h-full
    return (
        <>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-md w-full space-y-8">
                <div className='text-center font-bold text-bluenavish text-transform: uppercase'>{emprNomb}</div>
                    
                    <div>
                        <Link to={`/emprendimiento/${empr_id}/bmc`} className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Plan de negocios
                        </Link>
                    </div>
                    <div>
                        <Link to="/planfinanciamiento" className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Estructura de Financiamiento
                        </Link>
                    </div>

                    <div>
                        <Link to={`/check/${empr_id}/cronograma`} className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Cronograma
                        </Link>
                    </div>
                    {/*<div>
                        <Link to="/Actividades claves" className='relative block w-full px-3 py-4 bg-redish rounded-lg font-bold font-krona text-xs text-darkish text-center'>
                            Actividades claves
                        </Link>
                    </div>*/}
                    <p className='md:mb-16 md:pb-24' />
                    <p className='md:mb-16 md:pb-16' />
                </div>
            </div>
        </>
    );
}

export default SecondMenu;
