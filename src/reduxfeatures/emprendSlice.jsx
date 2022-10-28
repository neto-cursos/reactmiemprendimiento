import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import ApiAuth from "../Authentication/ApiAuth";
import { getEmprendimientos } from "../services/getEmprendimientos";

const POSTS_URL = '/misemprendimientos';
/*const initialState = {
    emprs: [{
        created_at: "",
        empr_desc: null,
        empr_esta: null,
        empr_id: 0,
        empr_nomb: "Emprendimiento 1",
        empr_rubro: "Rubro 1",
        empr_tipo: "Tipo 1",
        updated_at: "",
    },],
    status: 'idle',
    error: null,
}*/
const initialState = {
    emprs: [],
    status: 'idle',
    error: null,
    errores: [],
    empr_id_activo: '',
    empr_nomb_activo: '',
    operation:'none',
}

export const fetchEmprs = createAsyncThunk('emprs/fetchEmprs', async (datoid) => {

    //const {user}=useAuth();
    /*const response = await getEmprendimientos(datoid);
    */
    const response = await ApiAuth().post(POSTS_URL, { id: datoid }).then(response => {
        console.log("HOLIS");
        console.log(response);
        return response.data
    }).catch(error => {
        console.log(error)
    })
    return response;
    /*return await getEmprendimientos(datoid)*/
})

export const addNewEmpr = createAsyncThunk('emprs/addNewEmprs', async (initialPost) => {
    const response = await ApiAuth().post('/nuevoempr', initialPost).then(response => {
        return response.data
    })
    return response;
});
export const removeEmpr = createAsyncThunk('emprs/removeEmprs', async (datos) => {
    const response = await ApiAuth().post('/removeempr', datos).then(response => {
        return response.data;
    })
    return response;
});
export const updateEmprs = createAsyncThunk('emprs/updateEmprs', async (datos) => {
    const response = await ApiAuth().post('/updateempr', datos).then(response => {
        return response.data;
    })
    return response;
});
/*const initialState=[
    {
        id:"1",
        nombre:"Emprendimiento 1",
        rubro:"rubro 1",
        tipo:'tipo 1',
        estado:'1',
        descripcion:'descripcion 1'
    },
    {
        id:"2",
        nombre:"Emprendimiento 2",
        rubro:"rubro 2",
        tipo:'tipo 2',
        estado:'2',
        descripcion:'descripcion 2'
    },
]*/
export const emprendSlice = createSlice({
    name: 'emprendimientos',
    //initialState:[],
    initialState: initialState,
    reducers: {
        addEmprend: {
            reducer(state, action) {
                //action.type or 
                //action.payload
                console.log(state, action);
                /**
                 * En react no se puede usar push xq
                 * react maneja datos inmutables
                 *debería ser así [...state,action.payload]
                 *en redux se permite usar push
                 *sigue siendo inmutable
                 */
                state.emprs.push(action.payload);
            },
            prepare(nombre, rubro, tipo, descripcion) {
                return {
                    payload: {
                        id: nanoid(),
                        empr_nomb: nombre,
                        empr_rubro: rubro,
                        empr_tipo: tipo,
                        empr_desc: descripcion,
                        empr_esta: 1,
                    }
                }
            }
        },
        getEmprendFromDB: (state, action) => {
            state.emprs.concat(action.payload);
        },
        deleteEmprend: (state, action) => {
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const emprendFound = state.emprs.find(empr => empr.empr_id === action.payload)
            if (emprendFound) {
                state.emprs.splice(state.emprs.indexOf(emprendFound), 1)
            }

        },
        updateEmprend: (state, action) => {
            const { id, nombre, rubro, tipo, estado, descripcion } = action.payload;
            const emprendTask = state.emprs.find(emprend => emprend.id === id)
            if (emprendTask) {
                emprendTask.nombre = nombre;
                emprendTask.rubro = rubro;
                emprendTask.tipo = tipo;
                emprendTask.estado = estado;
                emprendTask.descripcion = descripcion;
            }
        }
        ,
        resetEmprendActiva: (state, action) => {
            state.empr_id_activo = '';
            state.empr_nomb_activo = '';
            state.errores.length = 0;
        },
        setEmprStatus: (state, action) => {
            state.status = action.payload;
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmprs.pending, (state, action) => {
                state.status = 'loading'
                console.log("PENDING")
            })
            .addCase(fetchEmprs.fulfilled, (state, action) => {

                console.log("SUCCEED")
                //const datos=JSON.parse(action.payload);
                console.log("DATOS REC")
                /*console.log(action.payload.map(emprs=>{
                    console.log(emprs);
                    state.emprs.concat(emprs);
                }));*/
                action.payload.map(emprs => {
                    console.log(emprs);
                    if (state.operation === 'updated') {
                        const emprendTask = state.emprs.find(emprend => emprend.empr_id ===Number( emprs.empr_id))
                        if (emprendTask) {
                            emprendTask.empr_nomb = emprs.empr_nomb;
                            emprendTask.empr_rubro = emprs.empr_rubro;
                            emprendTask.empr_tipo = emprs.empr_tipo;
                            emprendTask.empr_esta = emprs.empr_esta;
                            //emprendTask.descripcion = '';
                        }
                    } else {
                        if (!state.emprs.find(emprend => emprend.empr_id === emprs.empr_id))
                            state.emprs = state.emprs.concat(emprs);
                    }
                });
               // console.log("ACTIONPAYLOAD SESSIONSTORAGE");
               // console.log(JSON.stringify(action.payload));
                sessionStorage.setItem("emprendimientos", JSON.stringify(action.payload));
                state.status = 'succeeded';
                state.operation="none";
                //state.emprs=state.emprs.concat(emprendimientos);

                // Adding date and reactions
                /*let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });*/

                // Add any fetched posts to the array
                //state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchEmprs.rejected, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")
                state.error = action.error.message
            })
            .addCase(addNewEmpr.rejected, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")
                console.log(action)
                //state.error = action.error.message
            })
            .addCase(addNewEmpr.pending, (state, action) => {
                state.status = 'pending'
                console.log("pending")
                //state.error = action.error.message
            })
            .addCase(addNewEmpr.fulfilled, (state, action) => {
                console.log("FULLFILLED")
                state.status='fulfilled';

                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                /*const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;*/
                // End fix for fake API post IDs 

                /*action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }*/
                state.errores.length = 0;
                if (action.payload.errores) {

                    console.log(action.payload);
                    Object.keys(action.payload.errores).forEach(key => {

                        // state.errores.push({id:key,
                        //     msg:action.payload.errores[key]})    
                        action.payload.errores[key].map(e2 => {
                            state.errores.push({
                                id: key,
                                msg: e2
                            })
                        })
                    })
                    state.operation='createdError';
                    //console.log(action.payload.errores.empr_nomb)
                } else {
                    //state.posts.push(action.payload);
                    state.empr_id_activo = action.payload.empr_id;
                    state.empr_nomb_activo = action.payload.empr_nomb;
                    //state.status = 'idle';
                    state.operation='created';
                }

                //state.posts.push(action.payload)
            })
            .addCase(removeEmpr.pending, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")
            })
            .addCase(removeEmpr.fulfilled, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")

            })
            .addCase(removeEmpr.rejected, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")

            })
            .addCase(updateEmprs.pending, (state, action) => {
                state.status = 'pending'
                console.log("PENDING")
            })
            .addCase(updateEmprs.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                console.log("fulfilled")
                state.errores.length = 0;
                if (action.payload.errores) {

                    console.log(action.payload);
                    Object.keys(action.payload.errores).forEach(key => {
                        // state.errores.push({id:key,
                        //     msg:action.payload.errores[key]})    
                        action.payload.errores[key].map(e2 => {
                            state.errores.push({
                                id: key,
                                msg: e2
                            })
                        })
                    })
                    state.operation='updatedError';
                    //console.log(action.payload.errores.empr_nomb)
                } else {
                    //state.posts.push(action.payload);
                    state.empr_id_activo = action.payload.empr_id;
                    state.empr_nomb_activo = action.payload.empr_nomb;
                    state.operation='updated';
                }
                

            })
            .addCase(updateEmprs.rejected, (state, action) => {
                state.status = 'failed'
                console.log("FAILED")

            })
    }

})

export const selectAllEmprs = (state) => state.emprendimientos.emprs;
export const getEmprsStatus = (state) => state.emprendimientos.status;
export const getEmprsError = (state) => state.emprendimientos.error;

export const { addEmprend, deleteEmprend, updateEmprend, resetEmprendActiva,
    setEmprStatus } = emprendSlice.actions
export default emprendSlice.reducer;