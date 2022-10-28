import React from 'react';
import plussign from '../../../Images/plus-svgrepo-com.svg'
import EditEntry from '../../Icons/editEntry';
import EraseEntry from '../../Icons/eraseEntry';

const ModuleBox = ({respuestas,onMouseEnter,onMouseLeave,handleDelete,handleEdit,handleModulo,moduloNumber,moduloDB,imageName,buttonActiveHovering,classExtra, nameModulo,bgcolor,preguntas,
downlImage}) => {
    //console.log("__________preguntas")
    //console.log(preguntas);
    let pregIdOld=null;
    return (
        <>
            <div className={`text-lg font-black text-center rounded-lg ${classExtra}`}>
                <div className='flex flex-row pr-2 text-left pb-2 pt-1 pl-1'>
                    <h3 className='w-4/5'>
                        {nameModulo}
                    </h3>
                    {/*'icon'*/}
                    <span
                        className="w-1/5 text-right cursor-pointer"
                        onMouseEnter={() => onMouseEnter(moduloNumber)}
                        onMouseLeave={() => onMouseLeave(moduloNumber)}
                    >
                        {/*<MyLink href="/">*/}
                        {buttonActiveHovering===moduloNumber? (
                            <img src={plussign} width={44} height={47} alt="agregar" onClick={() => handleModulo(moduloDB)} />
                        ) : (
                            <img src={imageName} width={44} height={47} alt={nameModulo} />
                        )}
                        {/*</MyLink>*/}
                    </span>
                    {/*<LogoModule handleOpenp={setOpenp}></LogoModule>*/}

                </div>
                <div className='text-left pl-2 text-sm'>
                    {preguntas!=null&&preguntas.map((pregunta)=>{
                            pregIdOld=0;
                            return <>
                            {                                
                            pregunta.modu_id == moduloDB&&<>{
                            respuestas.map((respuesta) => {
                                                  
                                if (respuesta.modu_nume == moduloDB && respuesta.preg_id==pregunta.preg_id) {
                                    pregIdOld=pregIdOld+1;
                                    return (<>{pregIdOld===1?<span>{pregunta.preg_text}</span>:''}                                            
                                        <div key={respuesta.resp_id} className={`pt-1 py-1 ${bgcolor}`}>
                                            <div className='flex justify-between '>
                                                <h3 className='hover:text-red-700 cursor-pointer focus:ring-blue-500 text-bluenavish' onClick={() => handleEdit(respuesta.resp_id,moduloDB)}>{respuesta.resp_text}</h3>
                                                {!downlImage&&<div className='bg-transparent flex text-xs items-center'>
                                                    <button name="botondel" className='flex' onClick={() => {
                                                        return handleDelete(respuesta.resp_id)
                                                    }}><EraseEntry color="redish"></EraseEntry>&nbsp;</button>&nbsp;&nbsp;
                                                    {/*
                                                    <button className='flex' onClick={() => handleEdit(respuesta.resp_id,moduloDB)}>
                                                    <EditEntry color="blue"></EditEntry></button> */}
                                                </div>}
                                            </div>
                                            <div className='flex'>
                                                <p>{respuesta.resp_desc}</p>
                                            </div>
                                        </div></>)
                                }
                            })
                            }</>
                            }</> 
                        }
                    )}

                        
                    
                    {}
                </div>
            </div>
        </>


    );
}

export default ModuleBox;
