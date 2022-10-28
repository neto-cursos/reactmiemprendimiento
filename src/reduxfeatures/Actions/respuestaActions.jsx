import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiAuth from '../../Authentication/ApiAuth'

export const getRespuestas = createAsyncThunk('respuestas/get',
    async (datos) => {
        const data = await ApiAuth().post('/respuestas/get', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            console.log("response respuestasActions Get:")
            console.log(response);
            return response.data;
        })
        return data
    }
)

export const createRespuestas = createAsyncThunk(
    'respuestas/create',
    async (datos) => {
        const data = await ApiAuth().post('/respuestas/create', datos).then(response => {
            console.log("response resuestaActions create:")
            console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateRespuestas = createAsyncThunk('respuestas/update',
    async (datos) => {
        const data = await ApiAuth().post('/respuestas/update', datos).then(response => {
            console.log("response resuestaActions update:")
            console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteRespuestas = createAsyncThunk(
    'respuestas/delete',
    async (datos) => {
        const data = await ApiAuth().post('/respuestas/delete', datos).then(response => {
            console.log("response resuestaActions delete:")
            console.log(response);
            return response.data;
        })
        return data
    }
)

