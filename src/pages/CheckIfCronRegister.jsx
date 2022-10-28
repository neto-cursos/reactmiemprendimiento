import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { checkIfCronReg, createCronogramas } from '../reduxfeatures/Actions/cronogramaActions';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Slider,
    Select,
    MenuItem
} from "@mui/material";
import dayjs from 'dayjs';

import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { nanoid } from 'nanoid';
import { changeIdState } from '../reduxfeatures/cronogramaSlice';


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pl: 6,

};
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
    fontSize: '1.3rem',
}));

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}


const unformatDate = (date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

const CheckIfCronRegister = () => {

    const [newCron, setNewCron] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const { empr_id } = useParams();
    const fecha = new Date();
    const cronogramas = useSelector(state => state.cronogramas);
    const navigate = useNavigate();
    const [valueDate, setValueDate] = React.useState(dayjs(`${fecha.getFullYear()}-
     ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    // const [valueDate2, setValueDate2] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [valueDate2, setValueDate2] = React.useState(dayjs(`${fecha.getFullYear()}-
     ${fecha.getMonth() + 1}-${fecha.getDate()}`));

    yup.setLocale({
        mixed: {
            default: 'Error',
            required: 'Este campo es requerido',
        },

        number: {
            min: 'El número debe ser mayor a ${min}',
        },
    });

    let schema = yup.object().shape({
        id: yup.string(),
        name: yup.string().required(),
        start: yup.date().required().typeError('Debe ser una fecha válida'),
        end: yup.date().required().typeError('Debe ser una fecha válida'),
        responsable: yup.string().required().typeError('Debe ingresar un responsable de la actividad'),
    })

    const formatDate = (date, type) => {
        // console.log("DATE"); console.log(date);
        let end = 0;
        end = date.indexOf("/");
        const day = date.slice(0, end);
        date = date.slice(end + 1);
        // console.log("DATE2"); console.log(date);
        end = date.indexOf("/");
        const month = date.slice(0, end);
        date = date.slice(end + 1);
        // console.log("DATE3"); console.log(date);
        const year = date.slice(0);
        // while(date.indexOf("/")!==-1){
        //     fecha+=date.splice(start,date.indexOf("/"));

        //   }
        if (type === "end")
            return (new Date(year, month - 1, day, 23, 59, 59))
        return (new Date(year, month - 1, day))
    }

    dayjs.locale('es');
    const [tareaActiva, setTareaActiva] = useState();
    const [idActiva, setIdActiva] = useState('');

    const handleEdit = (id) => {
        console.log("entro handleedit");
        console.log(id);

        //setIdActiva('');
        setIdActiva(id);
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    let fechaInicio = valueDate;
    let fechaFin = valueDate2;
    if (tareaActiva) {
        if (tareaActiva.start && tareaActiva.end) {
            fechaInicio = dayjs(`${tareaActiva.start.getFullYear()}-
     ${tareaActiva.start.getMonth() + 1}-${tareaActiva.start.getDate()}`);
            fechaFin = dayjs(`${tareaActiva.end.getFullYear()}-
     ${tareaActiva.end.getMonth() + 1}-${tareaActiva.end.getDate()}`);
        }
    }


    // useLayoutEffect(() => {
    //     dispatch(changeIdState('new'))        
    // }, []);
    useEffect(() => {
        if(newCron===false&&isReady===false){
            dispatch(checkIfCronReg({ empr_id: empr_id }));
        }
    }, []);


    

    useEffect(() => {
        console.log(cronogramas.idState);
        if (cronogramas.idState == "readytocreate"&&isReady==false) {
            setNewCron(true);
        }
        else if (cronogramas.idState == "exists"&&newCron==false) {
            setIsReady(true);
        }

    }, [cronogramas.idState]);
    
    useEffect(() => {
        
    }, [newCron]);
    const dispatch = useDispatch();
    const submitForm = (dataSubmitted) => {
        console.log(dataSubmitted);
        const fechaInicio = unformatDate(dataSubmitted.start);
        const fechaFin = unformatDate(dataSubmitted.end);
        console.log(fechaInicio);
        if (dataSubmitted.id === "") {
            const task = {
                id: nanoid(),
                empr_id: empr_id,
                type: "project",
                //project: crons.project,
                displayOrder: 1,
                name: dataSubmitted.name,
                start: fechaInicio,
                end: fechaFin,
                cron_resp: dataSubmitted.responsable,
                progress: 0,
                cron_done: false,
            }
            dispatch(createCronogramas(task));
            setIsReady(true);
            //dispatch(changeStatecron('created'));
        }
        else {
            const task = {
                id: dataSubmitted.id,
                empr_id: empr_id,
                type: "task",
                //project: crons.project,
                project: '1',
                name: dataSubmitted.name,
                start: fechaInicio,
                end: fechaFin,
                responsable: dataSubmitted.responsable,
                dependencies: [],
                cantidad: dataSubmitted.cantidad,
                unidad: dataSubmitted.unidad,
                costounitario: dataSubmitted.costounitario,
                monto: dataSubmitted.cantidad * dataSubmitted.costounitario,
                notas: dataSubmitted.notas,
                progress: 0,
                cron_done: false,
                estado: 'ontime',
            }
            // }
            // dispatch(updateCronograma(task));
            // dispatch(changeStatecron('updated'));

        }
    }
    useEffect(() => {
        if (isReady === true){
            //navigate(`/emprendimiento/${empr_id}/cronograma`);
            dispatch(changeIdState('new'))
            console.log("YAY!!")
        }
            
    }, [isReady,cronogramas.idState])

    return (newCron&& (
        <Box sx={style} component="form" onSubmit={handleSubmit(submitForm)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Registro de Cronograma
            </Typography>
            <Controller
                control={control}
                name="id"
                defaultValue={tareaActiva != null ? tareaActiva.id : ""}
                render={({ field }) => (
                    <TextField
                        {...field}

                        variant="filled"
                        label="id"
                        disabled
                        // variant="standard"
                        sx={{ display: 'none' }}
                    />
                )}
            />

            <Controller
                control={control}
                name="name"
                defaultValue={tareaActiva != null ? tareaActiva.name : ""}
                render={({ field }) => (
                    <TextField
                        {...field}

                        fullWidth
                        variant="filled"
                        label="Proyecto"

                    // variant="standard"
                    // sx={{ width: '31rem' }}
                    />
                )}
            />
            <div className="pt-4 flex justify-between pr-8">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <Stack spacing={3}> */}
                    <Controller
                        control={control}
                        name="start"
                        defaultValue={tareaActiva != null ? fechaInicio : valueDate}

                        render={({ field }) => (
                            <MobileDatePicker
                                {...field}
                                id="start"
                                label="Fecha Inicio"
                                inputFormat="DD/MM/YYYY"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        )}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Controller
                        control={control}
                        name="end"
                        defaultValue={tareaActiva != null ? fechaFin : valueDate2}

                        render={({ field }) => (
                            <MobileDatePicker
                                {...field}
                                id="end"
                                label="Fecha Fin"
                                inputFormat="DD/MM/YYYY"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        )}
                    />
                </LocalizationProvider>
            </div>
            <Controller
                control={control}
                name="responsable"
                defaultValue={tareaActiva != null ? tareaActiva.responsable : ""}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        variant="standard"
                        label="responsable"
                        id="responsable"
                        sx={{ pb: 1 }}
                    />
                )}
            />
            <div className="flex justify-center pt-2">
                {/* <ColorButton variant="contained" onClick={() => {
                        handleClose();
                    }}>Cancelar</ColorButton>
                    <span>&nbsp;&nbsp;</span> */}
                <ColorButton type="submit" variant="contained"
                // onClick={() => {
                //     alert('clicked');
                // }}
                >Guardar</ColorButton>
                {/* <button type="submit">Enviar</button> */}
            </div>
        </Box>
    )
    );
}

export default CheckIfCronRegister;
