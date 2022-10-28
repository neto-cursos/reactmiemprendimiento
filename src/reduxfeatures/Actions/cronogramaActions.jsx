import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiAuth from '../../Authentication/ApiAuth'

export const listCronogramas = createAsyncThunk('cronogramas/list',
    async (datos) => {
        const data = await ApiAuth().post('/listcronogramas', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            console.log("response cronogramasActions List:")
            console.log(response);
            return response.data;
        })
        return data
    }
)


export const checkIfCronReg = createAsyncThunk('cronogramas/checkifcronreg',
    async (datos) => {
        const data = await ApiAuth().post('/checkifemprhascron', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            console.log("response cronogramasActions Get:")
            // console.log(response);
            return response.data;
        })
        return data
    }
)

export const getCronogramas = createAsyncThunk('cronogramas/get',
    async (datos) => {
        const data = await ApiAuth().post('/getcronogramas', datos).then(response => {
            /**
             * console log para mostrar la respuesta
             */
            console.log("response cronogramasActions Get:")
            console.log(response);
            return response.data;
        })
        return data
    }
)


export const createCronogramas = createAsyncThunk(
    'cronogramas/create',
    async (datos) => {
        const data = await ApiAuth().post('/createcron', datos).then(response => {
            console.log("response cronogramaActions create:")
            console.log(response);
            return response.data;
        })
        return data
    }
)

export const updateCronogramas = createAsyncThunk('cronogramas/update',
    async (datos) => {
        const data = await ApiAuth().post('/updatecronogramas', datos).then(response => {
            console.log("response cronogramaActions update:")
            console.log(response);
            return response.data;
        })
        return data
    }
)
export const deleteCronogramas = createAsyncThunk(
    'cronogramas/delete',
    async (datos) => {
        const data = await ApiAuth().post('/deletecronogramas', datos).then(response => {
            console.log("response cronogramaActions delete:")
            console.log(response);
            return response.data;
        })
        return data
    }
)


