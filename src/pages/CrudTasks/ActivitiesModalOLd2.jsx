import React, { forwardRef } from 'react';
import ReactDOM from "react-dom";
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

const options = ["A", "B", "C", "D"];
const objOptions = [
    { value: 65, label: "A" },
    { value: 66, label: "B" },
    { value: 67, label: "C" }
];
const myHelper = {
    email: {
        required: "Email is Required",
        pattern: "Invalid Email Address"
    }
};

const style = {
    position: 'absolute',
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

const ActivitiesModal = ({isOpen,handleClose}) => {
    console.log("NOooooooooo")
    const fecha = new Date();
    const [valueNotas, setValueNotas] = React.useState('');
    const [valueDate, setValueDate] = React.useState(dayjs(`${fecha.getFullYear()}-
    ${fecha.getMonth() + 1}-${fecha.getDate()}`));
    // const [valueDate2, setValueDate2] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [valueDate2, setValueDate2] = React.useState(dayjs(`${fecha.getFullYear()}-
    ${fecha.getMonth() + 1}-${fecha.getDate()}`));

    const handleChangeDatePicker = (newValue) => {
        setValueDate(newValue);
    };
    const handleChangeDatePicker2 = (newValue) => {
        setValueDate2(newValue);
    };
    const handleChangeNotas = (event) => {
        setValueNotas(event.target.value);
    };

    const schema = yup.object({
        name: yup.string().required().typeError('Debe ingresar un nombre actividad'),
        //password: yup.number().positive().integer().required(),
        // start: yup.date().required().typeError('Debe ser una fecha válida'),
        // end: yup.date().required().typeError('Debe ser una fecha válida'),
        // responsable: yup.string().required().typeError('Debe ingresar un responsable de la actividad'),
        cantidad: yup.number().positive().typeError('Debe ser un número valido'),
        unidad: yup.string().typeError('Debe ingresar una unidad'),
        costounitario: yup.number().positive().typeError('Debe ser un costo válido'),
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const {
        fields: members,
        append: appendMemberRow,
        remove: removeMemberRow
    } = useFieldArray({
        control,
        name: "members"
    });

    const submitForm = (evt) => {
        evt.preventDefault();
        // dispatch();
        console.log("******USEFORM+++++");
        console.log(evt);
    }

    if (!isOpen) return null;
    // return preguntas!=null&&
    return (        
    ReactDOM.createPortal(
        <div>
            {/* {error && <Error>{errores}</Error>} */}
            {/* {errors.name?.message}
            {errors.start?.message}
            {errors.end?.message}
            {errors.responsable?.message}
            {errors.cantidad?.message}
            {errors.unidad?.message}
            {errors.costounitario?.message} */}

                    
                
            <Box sx={style} component="form" onSubmit={handleSubmit(submitForm)}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Registro de Actividad
                </Typography>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Ingrese Los siguientes datos de la actividad
                        </Typography> */}
                <Controller
                    control={control}
                    name="Actividad"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            variant="filled"
                            label="actividad"
                        // variant="standard"
                        // sx={{ width: '31rem' }}
                        />
                    )}
                />
                <div className="pt-4 flex justify-between pr-8">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <Stack spacing={3}> */}
                        <MobileDatePicker
                            id="start"
                            label="Fecha Inicio"
                            inputFormat="DD/MM/YYYY"
                            value={valueDate}
                            onChange={handleChangeDatePicker}
                            renderInput={(params) => <TextField {...params}

                            />
                            }
                        />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MobileDatePicker
                            id="end"
                            label="Fecha Fin"
                            inputFormat="DD/MM/YYYY"
                            value={valueDate2}
                            onChange={handleChangeDatePicker2}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {/* </Stack> */}
                    </LocalizationProvider>
                </div>
                <TextField id="responsable" label="Responsable" variant="standard" sx={{ width: '31rem' }} />
                <TextField id="dependencies" label="dependencia" variant="standard" sx={{ width: '31rem' }} />
                <div className="flex items-end">
                    <TextField id="cantidad" label="cantidad" variant="standard" sx={{ width: '10rem' }} type="number" />
                    &nbsp;&nbsp;<TextField id="unidad" label="unidad" variant="standard" sx={{ width: '10rem' }} />
                    &nbsp;&nbsp;<TextField id="costounit" label="costo unitario" variant="standard" sx={{ width: '10rem' }} type="number" /> <span>Bs.</span>
                </div>
                <TextField
                    id="notas"
                    label="Notas"
                    multiline
                    value={valueNotas}
                    onChange={handleChangeNotas}
                    sx={{ width: '31rem', mt: 3 }}
                    rows={3}
                />
                <div className="flex justify-center pt-2">
                    <ColorButton variant="contained" onClick={() => {
                        handleClose();
                    }}>Cancelar</ColorButton>
                    <span>&nbsp;&nbsp;</span>
                    {/* <ColorButton type="submit" variant="contained" 
                                // onClick={() => {
                                //     alert('clicked');
                                // }}
                                >Guardar</ColorButton> */}
                    <button type="submit">Enviar</button>
                </div>
            </Box>
             
        </div>,
        document.body  
        
    ));
};

export default ActivitiesModal;
