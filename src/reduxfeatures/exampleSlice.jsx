import { createSlice } from "@reduxjs/toolkit";
const initialState=[
    {
        id:"1",
        title:"task 1",
        description:"task 1 descrip",
        completed:false
    },
    {
        id:"2",
        title:"task 2",
        description:"task 2 descrip",
        completed:false
    }
]
export const exampleSlice=createSlice({
    name:'tasks',
    //initialState:[],
    initialState:initialState,
    reducers:{
        addTask:(state,action) => {
            //action.type or 
            //action.payload
            console.log(state,action);
            /**
             * En react no se puede usar push xq
             * react maneja datos inmutables
             *debería ser así [...state,action.payload]
             *en redux se permite usar push
             *sigue siendo inmutable
             */
            state.push(action.payload);
        },
        deleteTask:(state,action)=>{
            console.log(action.payload);
            //fin devuelve undefined si no lo encuentra
            const taskFound=state.find(task=>task.id===action.payload)
            if (taskFound){
                state.splice(state.indexOf(taskFound),1)

            }
                

        },
        updateTask:(state,action)=>{
            const {id,title,description}=action.payload;
            const foundTask=state.find(task=>task.id===id)
            if(foundTask){
                foundTask.title=title;
                foundTask.description=description;
            }
        }

    }
})
export const {addTask,deleteTask,updateTask}=exampleSlice.actions
export default exampleSlice.reducer;