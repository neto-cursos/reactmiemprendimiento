import React, { useEffect, useRef, useState } from "react";
import { Task, ViewMode, Gantt } from "./../components/Cronograma/Cronograma";
import { ViewSwitcher } from "./view-switcher";
import { getStartEndDateForProject, initTasks } from "./CronogramsHelper";
import "./Cronograma.css";
import { useDispatch, useSelector } from "react-redux";
import { addCronograma, changeHideCronograma, changeProjectName, changeStatecron, deleteCronograma, formatDateCronograma, updateCronograma } from "../reduxfeatures/cronogramaSlice";
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
import 'dayjs/locale/es';
import { useParams } from "react-router-dom";
import ActivitiesModal from "./CrudTasks/ActivitiesModal";
import * as yup from 'yup';
import { setLocale } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";
import { ConstructionOutlined, VerticalAlignTopRounded } from "@mui/icons-material";

import { listCronogramas, updateCronogramas, deleteCronogramas, createCronogramas } from './../reduxfeatures/Actions/cronogramaActions';
import Notifications from '../components/Notifications';
import ConfirmDialog from '../components/Dialog';
import { getSchema } from './../utils/Validation/Validation'
import { set } from "date-fns";
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}


const formatDate = (date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}
const Cronograma = () => {
    const msgNotif = ["La actividad se ha creado correctamente",
        "la actividad se ha modificado exitosamente",
        "la actividad se ha eliminado correctamente"
    ];
    const [showNotif, setShowNotif] = useState(false);
    const [errores, setErrores] = useState(null);
    const [dataReceived, setDatareceived] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState();
    const [accepted, setAccepted] = useState(false);
    /**
     * FORMS
     */
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
        // setValueDate2(newValue);
        console.log(newValue);
    };
    const handleChangeNotas = (event) => {
        setValueNotas(event.target.value);
    };

    yup.setLocale({
        mixed: {
            default: 'Error',
            required: 'Este campo es requerido',
        },

        number: {
            min: 'El número debe ser mayor a ${min}',
        },
    });

    // let schema = yup.object().shape({
    //     id:yup.string(),
    //     name: yup.string().required(),
    //     //password: yup.number().positive().integer().required(),
    //     // start: yup.date().required().typeError('Debe ser una fecha válida'),
    //     // end: yup.date().required().typeError('Debe ser una fecha válida'),
    //     responsable: yup.string().required().typeError('Debe ingresar un responsable de la actividad'),
    //     cantidad: yup.number().min(0),
    //     unidad: yup.string().typeError,
    //     costounitario: yup.number().min(0),
    // })

    //.required();

    //  const { control, handleSubmit, formState: { errors } } = useForm({
    //      resolver: yupResolver(schema)
    //  });

    //  const {
    //      fields: members,
    //      append: appendMemberRow,
    //      remove: removeMemberRow
    //  } = useFieldArray({
    //      control,
    //      name: "members"
    //  });


    const { empr_id } = useParams();
    /**form handler */
    // const { control, handleSubmit } = useForm({
    //     reValidateMode: "onBlur"
    //   });
    dayjs.locale('es');

    //const dateNow = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    // console.log("FECHAAAAAA");
    // console.log(dateNow);

    /**
     * MODAL state functions
     */
    const [isOpen, setIsOpen] = React.useState(false);
    const [idActiva, setIdActiva] = useState('');
    const [tareaActiva, setTareaActiva] = useState();
    const [hadErrors,setHadErrors]=useState(false);
    const handleOpen = () => {
        setIdActiva('');
        setIsOpen(true);
    }
    const handleClose = () => {
        setIdActiva('');
        setTareaActiva();
        setIsOpen(false);
        setErrores(null);
    };
    const handleEdit = (id) => {
        console.log("entro handleedit");
        console.log(id);

        //setIdActiva('');
        setIdActiva(id);
    };

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

    const handleDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Está seguro de borrar esta actividad?',
            subTitle: "Esta operación no puede ser revertida",
            onConfirm: () => {
                handleDeleteConfirmation(id);
            }
        })
        // const conf = window.confirm(`está seguro de eliminar la tarea  + ${() => {
        //     const cronogramaTask = tareas.find(cronograma => cronograma.id === id)
        //     return cronogramaTask.name;
        // }}`)
        // if (conf) {
        //     //setTareas(tareas.filter(t => t.id !== task.id));

        // }
        //return conf;
        console.log("deleteid");
        console.log(id);
    }
    const handleDeleteConfirmation = (id) => {
        dispatch(deleteCronograma(id));
        dispatch(changeStatecron('deleted'));
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }
    useEffect(() => {
        if (idActiva !== '') {
            tareas.map(t => {
                if (t.id == idActiva) {
                    console.log("TTTTTT")
                    console.log(t);
                    setTareaActiva(t);
                }

            });

        }
        // else if(idActiva===''){
        //     setTareaActiva();
        // }

    }, [idActiva]);

    useEffect(() => {
        if (idActiva != '') {
            setIsOpen(true);
            console.log(isOpen)
        }

    }, [tareaActiva]);
    /**
     * 
     */
    const crons = useSelector(state => state.cronogramas);

    const [predecesor, setPredecesor] = useState([]);
    const [sucesor, setsucesor] = useState([]);
    const [simultaneo, setsimultaneo] = useState([]);


    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

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
    const dispatch = useDispatch();
    const [tareas, setTareas] = useState([]);
    const [sendAction, setSendAction] = useState(false);
    const task = [];
    // const flag = useRef(false);
    const [flag, setFlag] = useState(false);
    const updateTable = () => {
        //is not necessary to JSON.stringify since Axios takes charge of that
        setSendAction(true);
        if (crons.idState === 'new') {
            dispatch(createCronogramas(crons.datos));
        } /*else if (canvasSelect.idState === 'db') {
            dispatch(updateRespuestas((respuestas)));
        }*/
    }
    useEffect(() => {
        if (crons.loaded === false) {
            task.length = 0;
            crons.cron.map(tarea => {
                const t = { ...tarea, start: formatDate(tarea.start, 'start'), end: formatDate(tarea.end, 'end'), }
                if (!task.find(cronograma => cronograma.id === t.id))
                    task.push(t);
            })
            setTareas(task);
        }
    }, [crons.cron]);

    useEffect(() => {
        if (tareas.length > 0) {
            if (sessionStorage.getItem("emprendimientos")) {
                const emprendimientos = JSON.parse(sessionStorage.getItem("emprendimientos"))
                emprendimientos.map(emprend => {
                    if (emprend.empr_id == empr_id) {
                        dispatch(changeProjectName({ project_name: emprend.empr_nomb, project_id: emprend.empr_id }));
                    }
                })
            }
            setFlag(true);
        } else {
            setFlag(false);
        }

    }, [tareas])

    //view state , tareas gotten from initTasks(), isChecked; 
    const [view, setView] = React.useState(ViewMode.Day);
    // console.log("ViewMode: " + ViewMode.Day);
    // tareas.map(task=>{
    //     console.log( task);    
    // })

    const [isChecked, setIsChecked] = React.useState(true);

    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskChange = (task) => {
        console.log("On date change Id:" + task.id);
        let newTasks = tareas.map(t => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTareas(newTasks);
    };

    const handleTaskDelete = (task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTareas(tareas.filter(t => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task) => {
        setTareas(tareas.map(t => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };

    const handleDblClick = (task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleClick = (task) => {
        console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task, isSelected) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task) => {
        // setTareas(tareas.map(t => (t.id === task.id ? task : t)));
        //crons.cron.map(t => (t.id === task.id ? task : t))
        dispatch(changeHideCronograma({ id: task.id, hideChildren: task.hideChildren }));
        console.log("On expander click Id:" + task.id);
        console.log(task);
    };
    useEffect(() => {
        console.log("ERRORES:");
        console.log(errores);
        console.log("DATARECEIVED:");
        console.log(dataReceived)
        if (errores != null){
        if(errores.length>0){
            setAccepted(false);
        }
        else if(dataReceived===true)
            if (errores.length === 0) {
                console.log("USEEFFECT entro cond errores")
                setAccepted(true);
            }
        }
        return setDatareceived(false);
    }, [errores])

    useEffect(() => {
        if(hadErrors)
        setAccepted(false)
    }, [hadErrors]);

    useEffect(() => {
        console.log("******USEFORM+++++");
        console.log(dataSubmitted);
        if (errores != null) {
            console.log("USEEFFECT entro cond errores !=null")
            console.log("accepted" + accepted);
            console.log("errores length" + errores.length);
            if (accepted && errores.length === 0) {
                const fechaInicio = `${dataSubmitted.start.$D}/${(dataSubmitted.start.$M) + 1}/${dataSubmitted.start.$y}`;
                const fechaFin = `${dataSubmitted.end.$D}/${(dataSubmitted.end.$M) + 1}/${dataSubmitted.end.$y}`;
                const displayOrder = crons.cron.map(object => {
                    return object.displayOrder;
                });
                let max = Math.max(...displayOrder);
                let vectorDep;
                if (dataSubmitted.dependencies === "predecesora") {
                    vectorDep = (crons.cron.map(object => {
                        if (object.displayOrder === max)
                            return object.id;
                    }));
                }
                max = max === 0 ? 1 : max;
                console.log(max);
                console.log(idActiva);
                console.log(fechaInicio);
                console.log(fechaFin);
                if (dataSubmitted.id === "") {
                    const task = {
                        id: nanoid(),
                        empr_id: empr_id,
                        type: "task",
                        //project: crons.project,
                        project: '1',
                        displayOrder: max + 1,
                        name: dataSubmitted.name,
                        start: fechaInicio,
                        end: fechaFin,
                        responsable: dataSubmitted.responsable,
                        dependencies: vectorDep,
                        cantidad: dataSubmitted.cantidad,
                        unidad: dataSubmitted.unidad,
                        costounitario: dataSubmitted.costounitario,
                        monto: dataSubmitted.cantidad * dataSubmitted.costounitario,
                        notas: dataSubmitted.notas,
                        progress: 0,
                        cron_done: false,
                        estado: 'ontime'
                    }
                    dispatch(addCronograma(task));
                    dispatch(changeStatecron('created'));
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
                    dispatch(updateCronograma(task));
                    dispatch(changeStatecron('updated'));

                }
                return setAccepted(false);
            }

        }

    }, [dataSubmitted, accepted]);
    let flag2 = false;
    const submitForm = (data) => {
        flag2 = false;
        setDataSubmitted(data);
        console.log("DATTA TYPE....")
        console.log(data);
        let erroresAux = [];
        Object.keys(data).forEach(key => {

            getSchema(key)
                .validate({
                    [key]: data[key],
                }
                ).then((res)=>{})
                .catch(function (err) {
                    // console.log(err.name);
                    erroresAux.push({
                        errorKey: key,
                        errorValue: data[key],
                        errorMsg: err.errors,
                        errorExtra: '',
                    })
                })
            flag2 = true;
        });
        setDatareceived(true);
        if (flag2 === true)
            setErrores(erroresAux);
    }
    const [idmsg, setIdmsg] = useState(-1);
    useEffect(() => {

        if (crons.statecron === 'updated') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(1);
            setErrores(null);
            setIdActiva('');
            setTareaActiva();
        }
        if (crons.statecron === 'created') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(0);
            setErrores(null);
        }
        if (crons.statecron === 'deleted') {
            setShowNotif(true);
            setIsOpen(false);
            setIdmsg(2);
            setErrores(null);
        }

        return () => {
            dispatch(changeStatecron('idle'));
        };

    }, [crons.statecron]);


    return (<>
        {showNotif && <Notifications msgNotif={msgNotif[idmsg]} showNotif={showNotif} setShowNotif={setShowNotif} severity="info" />}
        <div className="Wrapper">
            <ViewSwitcher
                onViewModeChange={viewMode => setView(viewMode)}
                onViewListChange={setIsChecked}
                isChecked={isChecked}
            />

            <div>
                <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Registrar Nueva Actividad</Button>
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ActivitiesModal isOpen={isOpen} handleClose={handleClose}
                        valueDate={valueDate}
                        valueDate2={valueDate2} handleChangeDatePicker={handleChangeDatePicker}
                        handleChangeDatePicker2={handleChangeDatePicker2}
                        valueNotas={valueNotas} handleChangeNotas={handleChangeNotas}
                        submitForm={submitForm} schema={getSchema}
                        idActiva={idActiva}
                        tareaActiva={tareaActiva}
                        setIdActiva={setIdActiva}
                        errores={errores}
                    >

                    </ActivitiesModal>
                </Modal>

            </div>

            <h3>Diagrama de Gantt</h3>
            {flag && <Gantt
                tasks={tareas}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isChecked={isChecked}
            />}
            {/* <h3>Gantt With Limited Height</h3> */}
            {/* <Gantt
                tareas={tareas}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                ganttHeight={300}
                columnWidth={columnWidth}
            /> */}
        </div>
        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
    </>
    );
}

export default Cronograma;


