import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams,Link } from 'react-router-dom';
import AddEntry from '../components/Icons/addEntry';
import EditEntry from '../components/Icons/editEntry';
import EraseEntry from '../components/Icons/eraseEntry';
import PreguntasBmc from '../components/PreguntasBmc/PreguntasBmc';
import { getPreguntas } from '../reduxfeatures/Actions/preguntaActions';
import { addRespuesta, resetRespuestaAsistida } from '../reduxfeatures/respuestaAsistSlice';
import { agregarRespuesta } from '../reduxfeatures/respuestaSlice';
import { nanoid } from '@reduxjs/toolkit'
import { deleteRespuesta } from '../reduxfeatures/respuestaAsistSlice';
import { getSugerencias } from '../reduxfeatures/Actions/sugerenciaActions';
import ModalVideos from '../components/ModalVideos';
import { modulosConDesc } from '../constants/modulos'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Divider from '@mui/material/Divider';
import { accordionSummaryClasses } from '@mui/material';



const ModelCanvasPreguntas = () => {
    const theme = useTheme();

    const { empr_id, user_id, modu_nume, bmc_type = '' } = useParams();

    console.log("modu_nume:", modu_nume);
    const modu_nomb2 = modulosConDesc.find((nodo => nodo.modu_id == modu_nume))
    //console.log(modu_nomb2)
    const [playVideo, setPlayVideo] = useState({ id: '0', play: false });

    const handleLinkVideo = (id) => {
        setPlayVideo({ ...playVideo, id: 'ZQgXyiozmYY', play: true });
    }
    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);
    const [relInputRef, setRelInputRef] = useState({
        input1: 0,
        input2: 0,
        input3: 0,
        input4: 0,
    })

    const [txtActive, setTxtActive] = useState(0);
    const preguntas = useSelector(state => state.preguntas);
    const respuestas = useSelector(state => state.respuestasAsistidas);
    const canvasSelect = useSelector(state => state.canvas);
    const sugerencias = useSelector(state => state.sugerencias);
    const respuestasOriginales = useSelector(state => state.respuestas);
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: canvasSelect.datos.canv_id,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [formInput2, setFormInput2] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: canvasSelect.datos.canv_id,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [formInput3, setFormInput3] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: canvasSelect.datos.canv_id,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [formInput4, setFormInput4] = useState({
        resp_id: '',
        preg_id: '',
        modu_nume: '',
        canv_id: canvasSelect.datos.canv_id,
        resp_nume: '',
        resp_text: '',
        resp_desc: '',
        resp_esta: ''
    });
    const [datosInput, setDatosInput] = useState({
        preg_id: -1,
        sugerencia: '',
    })
    const [isReady, setIsReady] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const updateFormInput = (suge, preguntaid) => {
        setRelInputRef(auxInput);
        setDatosInput({ preg_id: preguntaid, sugerencia: suge, })
        console.log(relInputRef);
        console.log(preguntaid);
        console.log(input1);
    }
    useEffect(() => {
        console.log(relInputRef);
        if (datosInput.preg_id == relInputRef.input1)
            input1.current.value = datosInput.sugerencia;
        if (datosInput.preg_id == relInputRef.input2)
            input2.current.value = datosInput.sugerencia;
        if (datosInput.preg_id == relInputRef.input3)
            input3.current.value = datosInput.sugerencia;
        if (datosInput.preg_id == relInputRef.input4)
            input4.current.value = datosInput.sugerencia;
    }, [relInputRef]);
    const updateFormInput2 = e => {
        e.persist();
        console.log(e.target.value);
        setFormInput2(prevState => ({ ...prevState, resp_text: input2.current.value }))
    }
    const updateFormInput3 = e => {
        e.persist();
        setFormInput3(prevState => ({ ...prevState, resp_text: input3.current.value }))
    }
    const updateFormInput4 = e => {
        e.persist();
        setFormInput4(prevState => ({ ...prevState, resp_text: input4.current.value }))
    }
    const addResponse = (p_id) => {
        setFormInput(prevState => ({ ...prevState, resp_id: nanoid(), preg_id: p_id, modu_nume: modu_nume, resp_text: input1.current.value }))
        //setIsReady(true);
        setTxtActive(1);
    }
    const addResponse2 = (p_id) => {
        setFormInput2(prevState => ({ ...prevState, resp_id: nanoid(), preg_id: p_id, modu_nume: modu_nume, resp_text: input2.current.value }))
        setTxtActive(2);
    }
    const addResponse3 = (p_id) => {
        setFormInput3(prevState => ({ ...prevState, resp_id: nanoid(), preg_id: p_id, modu_nume: modu_nume, resp_text: input3.current.value }))
        setTxtActive(3);
    }
    const addResponse4 = (p_id) => {
        setFormInput4(prevState => ({ ...prevState, resp_id: nanoid(), preg_id: p_id, modu_nume: modu_nume, resp_text: input4.current.value }))
        setTxtActive(4);
    }
    useEffect(() => {
        //if (isReady === true)
        if (txtActive > 0) {
            if (txtActive === 1)
                dispatch(addRespuesta(formInput));
            if (txtActive === 2)
                dispatch(addRespuesta(formInput2));
            if (txtActive === 3)
                dispatch(addRespuesta(formInput3));
            if (txtActive === 4)
                dispatch(addRespuesta(formInput4));

            return setTxtActive(0);
        }
        //dispatch(addRespuesta(formInput));
        //return setIsReady(false)

    }, [txtActive]);
    useEffect(() => {
        //if (isReady === true)
        console.log(formInput);
    }, [formInput]);


    useEffect(() => {
        dispatch(resetRespuestaAsistida());
        if (preguntas.loaded === false && preguntas.byModule === false) {
            dispatch(getPreguntas({ modu_nume: modu_nume }))
        }
        dispatch(getSugerencias({ modu_nume: modu_nume }));
    }, []);

    // useEffect(() => {
    //     console.log(preguntas);
    // }, [preguntas]);


    const handleEdit = () => {
        return null;
    };

    const handleDelete = (id) => {
        dispatch(deleteRespuesta(id))
    };

    const handleSubmit = () => {
        console.log("handle subimit SALIDA de datos ")
        console.log(respuestas);
        dispatch(agregarRespuesta(respuestas));
        setRedirect(true);
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (redirect === true)
            navigate(`/emprendimiento/${empr_id}/bmc`);
    }, [redirect])
    let c2 = 0;
    let c = 0;
    const sumarC2 = () => { c2 = c2 + 1 }
    const resetC2 = () => { c2 = 0 }
    let auxInput = {
        input1: 0,
        input2: 0,
        input3: 0,
        input4: 0,
    }
    const updateAuxInputs = (input) => {
        auxInput = input;
        console.log(auxInput)

    }
    const updateInputs = () => {
        setRelInputRef(auxInput);
    }
    return (
        <>
            <section className="grid gap-1 grid-auto-fit-[10rem]">
                <div className="py-3 pr-3 pl-10 col-span-5 bg-whitish rounded-md">
                    <h3 className='text-center text-2xl font-bold'>
                        Módulo {modu_nume}: {modu_nomb2.modulo}
                    </h3>
                    <h3 className="p-2 font-thin">{modu_nomb2.desc}</h3>
                    {resetC2}
                    {preguntas.preguntas.map((pregunta) => {
                        return pregunta.modu_id == modu_nume && <>
                            <div className=''>
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    {pregunta.preg_text}
                                </label>
                            </div>
                            {respuestas.length > 0 && respuestas.map((resp) => {

                                return pregunta.preg_id == resp.preg_id && (
                                    <div className="flex flex-row text-left" key={resp.resp_id}>
                                        <div className='w-11/12'>
                                            <div className="flex items-center border-b border-teal-500 py-2">
                                                <input value={resp.resp_text} key={nanoid()} className="italic appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="su respuesta" aria-label="Respuesta" disabled={true} required />
                                            </div>
                                        </div>
                                        <div className='w-1/12 text-right flex items-end justify-end'>
                                            <button className="flex" type="button" onClick={() => {
                                                return handleDelete(resp.resp_id)
                                            }}>
                                                <EraseEntry></EraseEntry></button>&nbsp;&nbsp;&nbsp;
                                            {/*<button className='flex' onClick={() => handleEdit('respuesta.id, moduloDB')}>
                                                <EditEntry color="blue"></EditEntry></button>*/}
                                        </div>
                                    </div>
                                )
                            })}
                            {sumarC2()}
                            {c2 === 1 &&
                                <div className="flex flex-row text-left">
                                    <div className='w-11/12'>
                                        <div className="flex items-center border-b border-teal-500 py-2">
                                            <textarea id="respuesta" key={nanoid()} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="su respuesta" aria-label="Respuesta" name="resp_text" ref={input1} />
                                        </div>{updateAuxInputs({ ...auxInput, input1: pregunta.preg_id })}
                                    </div>
                                    <div className='w-1/12 text-right flex items-center'>
                                        <button className="flex bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-1 text-white rounded" type="button" onClick={() => addResponse(pregunta.preg_id)}>
                                            <AddEntry></AddEntry>Agregar
                                        </button>
                                    </div>
                                </div>
                            }
                            {c2 === 2 &&
                                <div className="flex flex-row text-left">
                                    <div className='w-11/12'>
                                        <div className="flex items-center border-b border-teal-500 py-2">
                                            <textarea id="respuesta" key={nanoid()} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="su respuesta" aria-label="Respuesta" name="resp_text" ref={input2} />
                                        </div>
                                        {updateAuxInputs({ ...auxInput, input2: pregunta.preg_id })}
                                    </div>
                                    <div className='w-1/12 text-right flex items-center'>
                                        <button className="flex bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-1 text-white rounded" type="button" onClick={() => addResponse2(pregunta.preg_id)}>
                                            <AddEntry></AddEntry>Agregar
                                        </button>
                                    </div>
                                </div>
                            }
                            {c2 === 3 &&
                                <div className="flex flex-row text-left">
                                    <div className='w-11/12'>
                                        <div className="flex items-center border-b border-teal-500 py-2">
                                            <textarea id="respuesta" key={nanoid()} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="su respuesta" aria-label="Respuesta" name="resp_text" ref={input3} />
                                        </div>
                                        {updateAuxInputs({ ...auxInput, input3: pregunta.preg_id })}
                                    </div>
                                    <div className='w-1/12 text-right flex items-center'>
                                        <button className="flex bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-1 text-white rounded" type="button" onClick={() => addResponse3(pregunta.preg_id)}>
                                            <AddEntry></AddEntry>Agregar
                                        </button>
                                    </div>
                                </div>
                            }
                            {c2 === 4 &&
                                <div className="flex flex-row text-left">
                                    <div className='w-11/12'>
                                        <div className="flex items-center border-b border-teal-500 py-2">
                                            <textarea id="respuesta" key={nanoid()} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="su respuesta" aria-label="Respuesta" name="resp_text" ref={input4} />
                                        </div>
                                        {updateAuxInputs({ ...auxInput, input4: pregunta.preg_id })}
                                    </div>
                                    <div className='w-1/12 text-right flex items-center'>
                                        <button className="flex bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-1 text-white rounded" type="button" onClick={() => addResponse4(pregunta.preg_id)}>
                                            <AddEntry></AddEntry>Agregar
                                        </button>
                                    </div>
                                </div>
                            }

                        </>
                    })}



                </div>
                <div className="px-32 md:px-32 xl:px-3 pt-12 col-span-5 md:col-span-5 
                lg:col-span-5
                xl:col-span-2 2xl:col-span-2 bg-whitish rounded-md">
                    <h3 className='font-bold text-lg'>
                        {'Sugerencias'}
                    </h3>
                    {preguntas.preguntas.map((pregunta) => {
                        c = c + 1;
                        return pregunta.modu_id == modu_nume && <>
                            <div className='pt-5 text-sm font-bold text-canvas2Txt'>Material de Apoyo Pregunta {c}</div>

                            <Card sx={{ display: 'flex' }} className="flex-col">
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.preg_id && suge.suge_tipo == 'Ejemplo' && suge.suge_rubro == bmc_type && (<>

                                            <Box sx={{ display: 'flex', flexDirection: 'row' }}
                                                className="items-center">

                                                <Typography className="pl-2" component="div" variant="subtitle1" key={suge.suge_id}>
                                                    {suge.suge_text}
                                                </Typography>
                                                <Typography className="pl-1 m-0" variant="caption" color="text.secondary" component="div">
                                                    Ejemplo
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 0, pb: 0 }} className="m-0">
                                                    {/* <IconButton aria-label="previous">
                                                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                            </IconButton> */}
                                                    <IconButton aria-label="play/pause" onClick={() => updateFormInput(suge.suge_text, suge.preg_id)}>
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                    {/* <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
                                                </Box>
                                            </Box>
                                            <Divider /></>))}
                                    </>
                                })}

                            </Card>

                            {/* <h3 className="text-orange-500 pt-3">Ejemplos</h3>
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.preg_id && suge.suge_tipo == 'Ejemplo' && suge.suge_rubro == bmc_type && (
                                            <div className="flex flex-row" key={suge.suge_id}>
                                                {suge.suge_text}
                                            </div>
                                        ))}


                                    </>
                                })} */}

                            <Card sx={{ display: 'flex' }} className="flex-col mt-1">
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.preg_id && suge.suge_tipo == 'Video' && suge.suge_rubro == bmc_type && (<>

                                            <Box sx={{ display: 'flex', flexDirection: 'row' }}
                                                className="items-center">

                                                <Typography className="pl-2" component="div" variant="subtitle1" key={suge.suge_id}>
                                                    {suge.suge_text}
                                                </Typography>
                                                <Typography className="pl-1 m-0" variant="caption" color="text.secondary" component="div">
                                                    Video
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 0, pb: 0 }} className="m-0">
                                                    {/* <IconButton aria-label="previous">
                                                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                            </IconButton> */}
                                                    <Link to={`/videoplayer/${suge.suge_id}`}>
                                                        <IconButton aria-label="play/pause">
                                                            <PlayArrowIcon />
                                                        </IconButton>
                                                    </Link>
                                                    {/* <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
                                                </Box>
                                            </Box>
                                            <Divider /></>))}
                                    </>
                                })}

                            </Card>

                            {/* <h3 className="text-orange-500 pt-3">Ejemplos</h3>
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.preg_id && suge.suge_tipo == 'Ejemplo' && suge.suge_rubro == bmc_type && (
                                            <div className="flex flex-row" key={suge.suge_id}>
                                                {suge.suge_text}
                                            </div>
                                        ))}


                                    </>
                                })} */}



                            {/* <div>
                                <h3 className="text-orange-500 pt-3">
                                    Videos</h3>
                                {sugerencias.map((suge) => {
                                    return <>

                                        {(suge.preg_id == pregunta.preg_id && suge.suge_tipo == 'Video' && suge.suge_rubro == bmc_type && (
                                            <div className="flex flex-row" key={suge.suge_id}>
                                                <button onClick={() => handleLinkVideo(suge.suge_link)}>{suge.suge_link}</button>
                                            </div>
                                        ))}

                                    </>
                                })}
                            </div> */}

                        </>
                    })}
                </div>
                <div className="col-span-6 text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-12 rounded" onClick={() => handleSubmit()}>GUARDAR</button>
                </div>
            </section>
            {playVideo.play === true && playVideo.id !== null && <ModalVideos playVideo={playVideo} setPlayVideo={setPlayVideo}></ModalVideos>}
            <PreguntasBmc user_id={user_id} modu_nume={modu_nume} bmc_type={bmc_type}></PreguntasBmc>
        </>
    );
}

export default ModelCanvasPreguntas;
