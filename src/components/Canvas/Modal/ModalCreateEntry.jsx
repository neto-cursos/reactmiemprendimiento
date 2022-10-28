import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRespuesta, deleteRespuesta, updateRespuesta } from "../../../reduxfeatures/respuestaSlice";
import { v4 as uuid } from "uuid";
import {modulos} from './../../../constants/modulos'
const ModalCreateEntry = ({ message, isOpen, onClose, modulo, idRespuesta, setIdRespuesta,idCanvas ,preguntas}) => {
    
    const modu_nomb2 = modulos.find((nodo => nodo.modu_id == modulo))
    
    const inputTitle = useRef(null);
    const inputDesc = useRef(null);
    const inputIdPreg=useRef(null);
    const dispatch = useDispatch();
    const respuestas = useSelector(state => state.respuestas);
    const [isReadyToSend,setIsReadyToSend]=useState(false);

    const [respuesta, setRespuesta] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: idCanvas,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    console.log("Modal CreateEntry .. Respuesta")
    console.log(respuesta);

    
    const onClicAccion = () => {
        setRespuesta({
            ...respuesta,
            resp_text: inputTitle.current.value,
            //resp_desc: inputDesc.current.value,
            preg_id: inputIdPreg.current.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const resp = {
            resp_id: '',
            modu_nume: modulo,
            canv_id: idCanvas,
            resp_nume: '',
            resp_text: inputTitle.current.value,
            //resp_desc: inputDesc.current.value,
            preg_id: inputIdPreg.current.value,
            resp_esta: ''
        }
        if (idRespuesta !== 0) {
            console.log("ModalCreateEntry .. updateRespuesta")
            console.log(respuesta);
            //dispatch(updateRespuesta(respuesta))
            setIsReadyToSend(true);
            onClicAccion();
        } else {
            dispatch(addRespuesta({
                ...resp, resp_id: uuid(),
            }));
            onClose();
        }
    }
    useEffect(() => {
        if (idRespuesta !== 0) {
            setRespuesta(respuestas.find(resp => resp.resp_id === idRespuesta && resp.modu_nume ==modulo));
            console.log("ModalcreateEntry .. Respuestas ")
            console.log(respuestas)
            console.log("ModalcreateEntry .. Modulo ")
            console.log(modulo)
            console.log("ModalcreateEntry .. respuesta encontrada ")
            console.log(respuestas.find(resp => resp.resp_id === idRespuesta && resp.modu_nume ==modulo))
        }
        //console.log('cargo')
    }, [idRespuesta,modulo,respuestas])

    useEffect(() => {
        if (idRespuesta !== 0) {
            inputTitle.current.value = respuesta.resp_text;
            //inputDesc.current.value = respuesta.resp_desc;
            inputIdPreg.current.value=respuesta.preg_id;
            
            console.log("ModalCreateEntry .. valor de st respuesta")
            console.log(respuesta);
            if(isReadyToSend){
            dispatch(updateRespuesta(respuesta));
            setIsReadyToSend(false)
            onClose()}
        }
    }, [respuesta,idRespuesta,isReadyToSend,dispatch])


    if (!isOpen) return null;
    return preguntas!=null&&ReactDOM.createPortal(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            {modu_nomb2.modulo} {/*idRespuesta*/}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-redish opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => onClose}
                        >
                            <span className="bg-transparent text-redish opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-2 flex-auto">
                        {/*<p className="my-4 text-slate-500 text-lg leading-relaxed">
                            <label>Respuesta</label>
                            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ref={inputTitle} />
    </p>*/}
                        <p>
                            <select className="my-4 text-lg leading-relaxed text-bluenavish" name="pregunta" id="pregunta" ref={inputIdPreg}>
                                {preguntas.map(preg=>{
                                    return (preg.modu_id==modulo&&<option value={preg.preg_id}>
                                           {preg.preg_text} 
                                    </option>)
                                })}
                                
                            </select>
                        </p>
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            <label>Respuesta</label>
                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Su respuesta..." ref={inputTitle}></textarea>
                        </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalCreateEntry;
