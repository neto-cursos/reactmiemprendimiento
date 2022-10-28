import { createSlice} from "@reduxjs/toolkit";
import { createCanvas, deleteCanvas, updateCanvas, getCanvas } from "./Actions/CanvaActions";
import {customAlphabet} from "nanoid"
/*const initialState = [
    {
            canv_id: "",
            empr_id: "",
            canv_esta: 1,
    }
]
*/

const initialState = {
    estado:'loading',
    idState:'pending',
    datos:{
    canv_id: "",
    empr_id: "",
    canv_esta: 1,}
}
export const canvasSlice = createSlice({
    name: 'canvas',
    //initialState:[],
    initialState: initialState,
    reducers: {
        addCanva: (state, action) => {
            console.log(state, action);
            state.datos.push(action.payload);
        },
        deleteCanva: (state, action) => {
            console.log(action.payload);
            const canvFound = state.datos.find(task => task.canv_id === action.payload)
            if (canvFound) {
                state.datos.splice(state.datos.indexOf(canvFound), 1)
            }
        },
        updateCanva: (state, action) => {
            const { canv_id, empr_id } = action.payload;
            const canvaTask = state.datos.find(canva => canva.canv_id === canv_id)
            if (canvaTask) {
                canvaTask.canv_id = canv_id;
                canvaTask.empr_id = empr_id;
            }
        },
        setEmpr_id: (state, action) => {
            state.datos.empr_id=action.payload;
            state.estado='ready'
        },
        resetEstado:(state,action)=>{
            state.estado='loading';
            state.idState='pending';
        }
    },
    extraReducers(builder) {
        // login user
        builder
            .addCase(getCanvas.pending, (state, action) => {
                console.log("Getcanvas Pending");
            })
            .addCase(getCanvas.fulfilled, (state, action) => {
                console.log("Getcanvas Fullfilled");
                if ('canv_id' in action.payload) {
                    state.datos.canv_id = action.payload.canv_id;
                    state.datos.empr_id = action.payload.empr_id;
                    state.datos.canv_esta = action.payload.canv_esta;
                    console.log("state last")
                    console.log(state);
                    state.idState='db'
                }
                else {
                    console.log("error has happened");
                    const nanoid=customAlphabet('123456789', 9);
                    state.datos.canv_id = nanoid();
                    console.log(state.datos.canv_id);
                    state.idState='new'
                }
                state.estado='loaded';
            })
            .addCase(getCanvas.rejected, (state, action) => {
                console.log("Getcanvas Rejected");
            })
            // register user
            .addCase(createCanvas.pending, (state, action) => {
                console.log("createCanvas Pending");
            })
            .addCase(createCanvas.fulfilled, (state, action) => {
                console.log("createCanvas FullFilled");
                state.idState='db';
            })
            .addCase(createCanvas.rejected, (state, action) => {
                console.log("createCanvas Rejected");
            })
            // get user details
            .addCase(updateCanvas.pending, (state, action) => {
                console.log("updateCanvas Pending");
            })
            .addCase(updateCanvas.fulfilled, (state, { payload }) => {
                console.log("updateCanvas FullFilled");
            })
            .addCase(updateCanvas.rejected, (state, { payload }) => {
                console.log("updateCanvas Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteCanvas.pending, (state, action) => {
                console.log("DeleteCanvas Pending");
            })
            .addCase(deleteCanvas.fulfilled, (state, { payload }) => {
                console.log("DeleteCanvas FullFilled");

            })
            .addCase(deleteCanvas.rejected, (state, { payload }) => {
                console.log("DeleteCanvas Rejected");
            })
    },
})
export const { addCanva, deleteCanva, updateCanva,setEmpr_id,resetEstado } = canvasSlice.actions
export default canvasSlice.reducer;