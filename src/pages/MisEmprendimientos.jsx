import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from '../reduxfeatures/Store';
import { Navigate, useLocation, useParams } from "react-router-dom";
import { setDataFromLocalSave, updateLoading } from '../reduxfeatures/userSlice';
import Spinner from '../components/Spinner/Spinner';

const MisEmprendimientos = () => {    
    const { auth, userInfo, loading } = useSelector(state => state.usuarios);
    const { empr_id,user_id,params } = useParams();
    const location = useLocation();

    //console.log("linkaddr:" + empr_id)
    //console.log("id:" + user_id)
    //console.log("location:" + location.pathname);
    //console.log("params:" + params.user_id)

    const addrReq1 = '/misemprendimientos/';
    console.log("empr user: " + userInfo.user_name)
    console.log("empr auth: " + auth)
    if (loading) {
        return (<><Spinner></Spinner></>)
    }
    else
        return (
            <>

                <div>
                    <span className='text-4xl'>Mis Emprendimientos</span>
                </div>
                {auth ? <Navigate to={`/misemprendimientos/${userInfo.user_id}`} replace={true}/> : <Navigate to='/' />}

            </>
        );
}

export default MisEmprendimientos;
