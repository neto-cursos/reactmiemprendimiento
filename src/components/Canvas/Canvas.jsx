import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import LogoModule from './LogoModule.jsx/LogoModule';
import ModalCreateEntry from "./Modal/ModalCreateEntry";
import channel from '../../Images/channels.svg';
import cost_structure from '../../Images/cost_structure.svg';
import customer_relationships from '../../Images/customer_relationships.svg';
import customer_segments from '../../Images/customer_segments.svg';
import key_activities from '../../Images/key_activities.svg';
import key_partners from '../../Images/key_partners.svg';
import key_resources from '../../Images/key_resources.svg';
import revenue_streams from '../../Images/revenue_streams.svg';
import value_propositions from '../../Images/value_propositions.svg';
import DownloadIcon from '@mui/icons-material/Download';

import { useDispatch, useSelector } from 'react-redux';
import { deleteRespuesta, resetRespuesta } from '../../reduxfeatures/respuestaSlice';
import ModuleBox from './ModuleBox/ModuleBox';
import { useParams, useNavigate } from 'react-router-dom';
import { listRespuestas, updateRespuestas } from './../../reduxfeatures/Actions/respuesta2Actions'
import { createCanvas, getCanvas } from '../../reduxfeatures/Actions/CanvaActions';
import { setEmpr_id, resetEstado } from '../../reduxfeatures/canvasSlice';
import { listPreguntas } from '../../reduxfeatures/Actions/preguntaActions';


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import * as htmlToImage from 'html-to-image';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const Canvas = () => {

    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const domEl = useRef(null);
    //console.log(domEl.current);
    
    const [downlImage,setDownlImage]=useState(false);
    const convertToImg=()=>{
        console.log("convert to img")
        setDownlImage(true);
    }
    useEffect(()=>{
        if(downlImage===true)
            downloadImage();
    },[downlImage])

    const downloadImage = async () => {
        const copyCanvas=domEl.current.cloneNode(
            true
          );
          console.log(copyCanvas);
          
          
        const dataUrl = await htmlToImage.toPng(domEl.current);

        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
        setDownlImage(false);
    }


    const navigate = useNavigate();
    //when using back button key in the browser
    window.onpopstate = () => {
        //navigate("/");
        dispatch(resetEstado());
    }



    const { empr_id } = useParams();
    console.log('*******************empr_id********************');
    console.log(empr_id);
    /**
     * estados para controlar modals y hoverings
     */
    const [buttonActiveHovering, setButtonActiveHovering] = useState(0);
    const [numeModulo, setNumeModulo] = useState(0);
    const [openp, setOpenp] = useState(false);

    const onMouseEnter = (id) => {
        setButtonActiveHovering(id);
    }
    const onMouseLeave = (id) => {
        setButtonActiveHovering(0);
    }
    /**
     * Selectors
     */
    const dispatch = useDispatch();
    const canvasSelect = useSelector(state => state.canvas)
    const respuestas = useSelector(state => state.respuestas)
    const preguntas = useSelector(state => state.preguntas);

    /**
     * Handle respuesta
     */
    const [idRespuesta, setIdRespuesta] = useState(0);
    const [sendAction, setSendAction] = useState(false);

    const handleModulo = (number) => {
        setOpenp(true);
        setNumeModulo(number);
    }

    const handleEdit = (id, moduloDB) => {
        setIdRespuesta(id);
        setNumeModulo(moduloDB);
        setOpenp(true);
    }

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteRespuesta(id));
    }

    const updateTable = () => {
        //is not necessary to JSON.stringify since Axios takes charge of that
        setSendAction(true);
        if (canvasSelect.idState === 'new') {
            dispatch(createCanvas(canvasSelect.datos));
        } /*else if (canvasSelect.idState === 'db') {
            dispatch(updateRespuestas((respuestas)));
        }*/
    }
    //console.log("openp::" + openp);

    /**
     * use effects */

    useLayoutEffect(() => {
        dispatch(setEmpr_id(empr_id));
        if (preguntas.loaded === false)
            dispatch(listPreguntas());
    }, [])

    useEffect(() => {
        if (canvasSelect.estado === 'ready') {
            //      console.log("canvas ... loading first")
            //      console.log(empr_id);
            dispatch(getCanvas({ empr_id: empr_id }));
        }
    }, [canvasSelect.estado])

    useEffect(() => {
        //dispatch(resetRespuesta());
        if (canvasSelect.estado === 'loaded' && canvasSelect.idState === 'db') {
            //    console.log("canvas ... loading when canvasSelect changes")
            console.log(canvasSelect);
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }))
        }
    }, [canvasSelect.estado, canvasSelect.idState, dispatch])

    useEffect(() => {
        // console.log("rerender")
    }, [respuestas]);

    useEffect(() => {
        console.log("__Canvas Sendaction__");
        console.log(sendAction);
        if (canvasSelect.idState === 'db' && sendAction === true) {
            dispatch(updateRespuestas((respuestas)));
            dispatch(resetRespuesta());
            dispatch(listRespuestas({ canv_id: canvasSelect.datos.canv_id }));
        }
        return (setSendAction(false));
    }, [canvasSelect.idState, sendAction]);


    return (        
        canvasSelect.datos.canv_id !== "" && preguntas.preguntas.length > 0 && <>
        {downlImage===true?
        <div id="micanvas" ref={domEl} className="w-[1280px] h-[720px]  grid gap-1
        grid-cols-5 h-[40rem]">
            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={1} moduloDB={8}
                imageName={key_partners} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG1 text-canvas1Txt row-span-2 "}
                nameModulo={'Asociaciones Claves'}
                bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
                downlImage={downlImage}
            />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG2 text-canvas2Txt"}
                nameModulo={"Actividades Claves"}
                bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG3 text-canvas3Txt row-span-2"}
                nameModulo={"Propuesta de valor"}
                bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG4 text-canvas4Txt"}
                nameModulo={"Relación con los clientes"}
                bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG5 text-canvas5Txt row-span-2"} nameModulo={"Segmento De Mercado"}
                bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG6 text-canvas6Txt "} nameModulo={"Recursos Claves"}
                bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />


            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                imageName={channel} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG7 text-canvas7Txt"} nameModulo={"Canales"}
                bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} 
                downlImage={downlImage}
                />


            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG8 text-canvas8Txt col-span-3"}
                nameModulo={"Estructura de costos"}
                bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />
            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG9 text-canvas9Txt col-span-2"} nameModulo={"Fuente de ingresos"}
                bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} 
                downlImage={downlImage}
                />


            <ModalCreateEntry
                message="Hello Portal World!"
                isOpen={openp}
                onClose={() => { setOpenp(false); setIdRespuesta(0) }}
                modulo={numeModulo}
                idRespuesta={idRespuesta}
                idCanvas={canvasSelect.datos.canv_id}
                setIdRespuesta={() => setIdRespuesta(0)}
                preguntas={preguntas.preguntas}
            />

        </div>:
        <div id="micanvas" ref={domEl} className="grid grid-cols-1 gap-1 md:grid-cols-2 
        lg:grid-cols-5  md:gap-1 lg:gap-1 pr-2
        sm:grid-cols-1 md:h-[40rem]">
            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={1} moduloDB={8}
                imageName={key_partners} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG1 text-canvas1Txt row-span-1 md:row-span-2 "}
                nameModulo={'Asociaciones Claves'}
                bgcolor={"bg-canvasBG1dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas}
            />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={2} moduloDB={7}
                imageName={key_activities} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG2 text-canvas2Txt"}
                nameModulo={"Actividades Claves"}
                bgcolor={"bg-canvasBG2dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={3} moduloDB={2}
                imageName={value_propositions} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG3 text-canvas3Txt row-span-1 md:row-span-2"}
                nameModulo={"Propuesta de valor"}
                bgcolor={"bg-canvasBG3dark  rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={4} moduloDB={4}
                imageName={customer_relationships} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG4 text-canvas4Txt"}
                nameModulo={"Relación con los clientes"}
                bgcolor={"bg-canvasBG4dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={5} moduloDB={1}
                imageName={customer_segments} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG5 text-canvas5Txt row-span-1 md:row-span-2"} nameModulo={"Segmento De Mercado"}
                bgcolor={"bg-canvasBG5dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />

            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={6} moduloDB={6}
                imageName={key_resources} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG6 text-canvas6Txt "} nameModulo={"Recursos Claves"}
                bgcolor={"bg-canvasBG6dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />


            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={7} moduloDB={3}
                imageName={channel} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG7 text-canvas7Txt"} nameModulo={"Canales"}
                bgcolor={"bg-canvasBG7dark rounded pl-2 pr-1"} />


            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={8} moduloDB={9}
                imageName={cost_structure} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG8 text-canvas8Txt col-span-1 md:col-span-3"}
                nameModulo={"Estructura de costos"}
                bgcolor={"bg-canvasBG8dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />
            <ModuleBox respuestas={respuestas}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                handleDelete={handleDelete} handleEdit={handleEdit}
                handleModulo={handleModulo} moduloNumber={9} moduloDB={5}
                imageName={revenue_streams} buttonActiveHovering={buttonActiveHovering}
                classExtra={"bg-canvasBG9 text-canvas9Txt col-span-1 md:col-span-2"} nameModulo={"Fuente de ingresos"}
                bgcolor={"bg-canvasBG9dark rounded pl-2 pr-1"} preguntas={preguntas.preguntas} />


            <ModalCreateEntry
                message="Hello Portal World!"
                isOpen={openp}
                onClose={() => { setOpenp(false); setIdRespuesta(0) }}
                modulo={numeModulo}
                idRespuesta={idRespuesta}
                idCanvas={canvasSelect.datos.canv_id}
                setIdRespuesta={() => setIdRespuesta(0)}
                preguntas={preguntas.preguntas}
            />
            </div>}


        {windowSize.innerWidth > 640 ?
            <div className='text-center absolute right-5 top-10 z-50 text-lg text-canvas4Txt'>
                <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                    <AddIcon> </AddIcon> <span className="text-xs">Actualizar Canvas</span>
                </Fab>
                <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={()=>convertToImg()}>
                    <DownloadIcon> </DownloadIcon> 
                </Fab>
            </div> :
            <div className='text-center fixed left-4 top-[120px] z-50 text-lg text-canvas4Txt'>
                <Fab color="secondary" variant="extended" aria-label="Actualizar Canvas" onClick={() => updateTable()}>
                    <AddIcon sx={{ fontSize: 20 }}> </AddIcon>
                </Fab><br />
                <Fab color="primary" variant="extended" aria-label="descargar Imagen" onClick={()=>convertToImg()}>
                    <DownloadIcon sx={{ fontSize: 20 }}> </DownloadIcon>
                </Fab>
                
            </div>


        }
        {/* <button onClick={() => updateTable()}>
            Actualizar Canvas
        </button> */}



    </>

    );
}

export default Canvas;
