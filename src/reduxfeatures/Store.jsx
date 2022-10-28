import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from './exampleSlice';
import emprendReducer from './emprendSlice'
import respuestaReducer from './respuestaSlice'
import userReducer from './userSlice';
import respuestasAsistidasReducer from './respuestaAsistSlice';
import preguntaReducer from './preguntaSlice';
import canvasReducer from './canvasSlice';
import sugerenciasReducer from './sugerenciasSlice';
import cronogramasReducer from './cronogramaSlice';
export const Store = configureStore({
    reducer:{
        tasks:exampleReducer,
        emprendimientos:emprendReducer,
        respuestas:respuestaReducer,
        usuarios:userReducer,
        respuestasAsistidas:respuestasAsistidasReducer,
        preguntas:preguntaReducer,
        canvas:canvasReducer,
        sugerencias:sugerenciasReducer,
        cronogramas:cronogramasReducer,
    }
    
})

//export default Store;
