import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { listCronogramas, updateCronogramas, deleteCronogramas, createCronogramas, checkIfCronReg } from './Actions/cronogramaActions';

const formatDate = (date) => {
    console.log("DATE"); console.log(date);
    let end = 0;
    end = date.indexOf("/");
    const day = date.slice(0, end);
    date = date.slice(end + 1);
    console.log("DATE2"); console.log(date);
    end = date.indexOf("/");
    const month = date.slice(0, end);
    date = date.slice(end + 1);
    console.log("DATE3"); console.log(date);
    const year = date.slice(0);
    // while(date.indexOf("/")!==-1){
    //     fecha+=date.splice(start,date.indexOf("/"));

    //   }
    const fecha = new Date(year, month, day);
    return (fecha)
}
const initialState = {
    idState: 'new',
    usr_id: -1,
    loaded: false,
    project: '',
    project_name:'',
    statecron:'idle',
    // cron:[{
    //     cron_id:'',
    //     empr_id:'28',
    //     cron_fech_ini:'',
    //     cron_fech_fin:'',
    //     cron_proy:'',
    //     cron_desc:'',
    //     cron_type:'',
    //     cron_hide_child:false,
    //     cron_done:false,
    //     cron_esta:false,
    //     created_at:'',
    //     updated_at:'',
    // }]
    cron: [
        {
            // id:nanoid(),
            id: '1',
            empr_id: '28',
            start: '01/10/2022',
            end: '23/10/2022',
            name: "Emprendimiento",
            progress: 0,
            type: "project",
            hideChildren: false,
            displayOrder: 1,
            crond_done: false,
            cron_id:nanoid(),
        },
        {
            id:nanoid(),
            empr_id:'28',
            type:"task",
            project:"1",
            displayOrder:2,
            name:"Comprar manzanas",
            start:'02/10/2022',
            end:'14/10/2022',
            responsable:"Neto Rodriguez",
            dependencies:[],
            acti_depen:[{
                id:1,
            }],
            cantidad:"2",
            unidad:"unidades",
            monto:"400Bs",
            notas:"se compró a tiempo",
            progress:0,
            cron_done:true,
            estado:'ontime',        
        },
    ]
}
export const cronogramaSlice = createSlice({
    name: 'cronogramas',
    //initialState:[],
    initialState: initialState,
    reducers: {
        addCronograma: (state, action) => {
            //action.type or 
            //action.payload
            console.log(state);
            state.cron.push(action.payload);
            state.statecron='created';
        },
        agregarCronograma: (state, action) => {
            action.payload.map(data => {
                console.log("data from add respuestas:")
                console.log(data);
                if (!state.cron.find(cronograma => cronograma.id === data.id))
                    state.cron.push(data);
                return state;
            });
            console.log("state last")
            console.log(state);
        },
        deleteCronograma: (state, action) => {
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const nodo = state.cron.find(cronograma => cronograma.id === action.payload)
            if (nodo) {
                state.cron.splice(state.cron.indexOf(nodo), 1)
            }
        },
        updateCronograma: (state, action) => {
            const { id, empr_id, name, start, end,
                responsable, dependencies, cantidad, unidad, monto, costounitario, type,
                notas, cron_done, progress, project, displayOrder
                // ,color
            } = action.payload;
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === id)
            if (cronogramaTask) {
                cronogramaTask.empr_id = empr_id;
                cronogramaTask.type = type;
                cronogramaTask.name = name;
                cronogramaTask.start = start;
                cronogramaTask.end = end;
                cronogramaTask.responsable = responsable;
                cronogramaTask.dependencies = dependencies;
                cronogramaTask.cantidad = cantidad;
                cronogramaTask.unidad = unidad;
                cronogramaTask.monto = monto;
                cronogramaTask.costounitario = costounitario;
                cronogramaTask.notas = notas;
                cronogramaTask.cron_done = cron_done;
                cronogramaTask.progress = progress;
                cronogramaTask.project = project;
            }
            state.statecron='updated';
        },
        resetCronograma: (state, action) => {
            state.cron.length = 0;
        },
        changeHideCronograma: (state, action) => {
            console.log("ACTION changehidecronograma");
            console.log(action);
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === action.payload.id)
            if (cronogramaTask) {
                cronogramaTask.hideChildren = action.payload.hideChildren
            }
        },
        changeProjectName: (state, action) => {
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === '1')
            if (cronogramaTask) {
                cronogramaTask.name = action.payload.project_name;
                state.project_name = action.payload.project_name;
                state.project=String(action.payload.project_id);
            }

        },
        changeCron_done: (state, action) => {
            const cronogramaTask = state.cron.find(cronograma => cronograma.id === action.payload.id)
            if (cronogramaTask) {
                cronogramaTask.cron_done = action.payload.value;
            }
        },
        changeStatecron:(state,action)=>{
            state.statecron=action.payload;
        },
        changeIdState:(state,action)=>{
            console.log("ACTION ID")
            console.log(action.payload);
            state={...state,idState:action.payload};
        }

    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(listCronogramas.pending, (state, action) => {
                console.log("GetCronograma Pending");
            })
            .addCase(listCronogramas.fulfilled, (state, action) => {
                console.log("GetCronograma Fullfilled");
                action.payload.map(data => {
                    console.log("data from add respuestas:")
                    console.log(data);
                    if (!state.cron.find(cronograma => cronograma.id === data.id))
                        state.cron.push(data);
                    return state;
                });
                console.log("state last")
                console.log(state);

            })
            .addCase(checkIfCronReg.rejected, (state, action) => {
                console.log("checkIfCronReg Rejected");
            })
            // register user
            .addCase(checkIfCronReg.pending, (state, action) => {
                console.log("checkIfCronReg Pending");
            })
            .addCase(checkIfCronReg.fulfilled, (state, action) => {
                console.log("checkIfCronReg FullFilled");
                if(action.payload.habilitado=='yes'){
                    state.idState='readytocreate';
                }else if(action.payload.habilitado=='no'){
                    state.idState='exists'
                }
                
                // if(action.payload)
                // state.idState='new'
            })
            .addCase(listCronogramas.rejected, (state, action) => {
                console.log("GetCronograma Rejected");
            })
            // register user
            .addCase(createCronogramas.pending, (state, action) => {
                console.log("Createcronogramas Pending");
            })
            .addCase(createCronogramas.fulfilled, (state, action) => {
                console.log("Createcronogramas FullFilled");
                state.idState='new';

            })
            .addCase(createCronogramas.rejected, (state, action) => {
                console.log("Createcronogramas Rejected");
            })
            // get user details
            .addCase(updateCronogramas.pending, (state, action) => {
                console.log("Updatecronogramas Pending");
            })
            .addCase(updateCronogramas.fulfilled, (state, { payload }) => {
                console.log("Updatecronogramas FullFilled");
            })
            .addCase(updateCronogramas.rejected, (state, { payload }) => {
                console.log("Updatecronogramas Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteCronogramas.pending, (state, action) => {
                console.log("Deletecronogramas Pending");
            })
            .addCase(deleteCronogramas.fulfilled, (state, { payload }) => {
                console.log("DeleteCronogramas FullFicled");

            })
            .addCase(deleteCronogramas.rejected, (state, { payload }) => {
                console.log("DeleteCronogramas Rejected");
            })
    },
})
export const { addCronograma, deleteCronograma, updateCronograma, agregarCronograma, 
    changeIdState,resetCronograma, changeHideCronograma, changeProjectName, changeCron_done,changeStatecron} = cronogramaSlice.actions
export default cronogramaSlice.reducer;